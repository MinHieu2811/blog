import Queue from 'bull'
import { v4 as uuidv4 } from 'uuid'

import { Database } from '@/lib/database'

// Retry connection logic
const createQueue = (retries = 3): Promise<Queue.Queue> => {
  return new Promise((resolve, reject) => {
    let attempt = 0

    const tryConnect = () => {
      attempt++
      console.log(`Attempting to connect to Redis (attempt ${attempt}/${retries})`)

      const queue = new Queue('tracking-queue', {
        redis: process.env.REDIS_ENDPOINT || 'redis://127.0.0.1:6379',
        defaultJobOptions: {
          removeOnComplete: 100,
          removeOnFail: 50,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000
          },
          timeout: 30000
        }
      })

      queue.on('ready', () => {
        console.log('Successfully connected to Redis')
        resolve(queue)
      })

      queue.on('error', (error) => {
        console.error(`Redis connection error (attempt ${attempt}):`, error)

        if (attempt >= retries) {
          reject(new Error(`Failed to connect to Redis after ${retries} attempts`))
        } else {
          setTimeout(tryConnect, 2000 * attempt) // Exponential backoff
        }
      })
    }

    tryConnect()
  })
}

let trackingQueue: Queue.Queue | null = null

const initializeQueue = async () => {
  try {
    trackingQueue = await createQueue()

    trackingQueue.process(5, async (job) => {
      const { data, slug, eventName, sessionId } = job.data
      const jobId = job.id

      console.log(`Processing job ${jobId}: ${eventName} for blog ${slug}`)

      try {
        if (!slug || !eventName) {
          throw new Error('Missing required fields: slug or eventName')
        }

        await Database.tracking.userTrackingEvent.create({
          data: {
            id: uuidv4(),
            sessionId: sessionId || uuidv4(),
            blogId: slug,
            eventType: eventName,
            eventData: data || {},
            timestamp: new Date()
          }
        })

        console.log(`Job ${jobId} completed successfully`)
      } catch (error) {
        console.error(`Job ${jobId} failed:`, error)

        try {
          await Database.tracking.errorLog.create({
            data: {
              id: uuidv4(),
              error: error instanceof Error ? error.message : 'Unknown error',
              event: eventName ?? 'Unknown event',
              eventData: {
                ...data,
                jobId,
                slug,
                sessionId,
                originalError: error instanceof Error ? error.stack : error
              },
              timestamp: new Date()
            }
          })
        } catch (logError) {
          console.error('Failed to log error to database:', logError)
        }

        throw error
      }
    })

    // Event listeners
    trackingQueue.on('completed', (job) => {
      console.log(`Job ${job.id} completed successfully`)
    })

    trackingQueue.on('failed', (job, error) => {
      console.error(`Job ${job.id} failed after retries:`, error)
    })

    trackingQueue.on('error', (error) => {
      console.error('Queue error:', error)
    })

    trackingQueue.on('stalled', (jobId) => {
      console.warn(`Job ${jobId} stalled`)
    })

    console.log('Queue initialized successfully')
  } catch (error) {
    console.error('Failed to initialize queue:', error)
    throw error
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, closing queue...')
  if (trackingQueue) {
    await trackingQueue.close()
  }
  await Database.disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('Received SIGINT, closing queue...')
  if (trackingQueue) {
    await trackingQueue.close()
  }
  await Database.disconnect()
  process.exit(0)
})

// Health check function
export const getQueueHealth = async () => {
  try {
    if (!trackingQueue) {
      return {
        status: 'not_initialized',
        error: 'Queue not initialized',
        timestamp: new Date().toISOString()
      }
    }

    const waiting = await trackingQueue.getWaiting()
    const active = await trackingQueue.getActive()
    const completed = await trackingQueue.getCompleted()
    const failed = await trackingQueue.getFailed()

    return {
      status: 'healthy',
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }
}

initializeQueue().catch(console.error)

export { trackingQueue }
