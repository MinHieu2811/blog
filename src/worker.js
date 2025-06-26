import Queue from 'bull'
import { v4 as uuidv4 } from 'uuid'

import { Database } from './lib/database.js'

console.log('🚀 Starting tracking worker...')
console.log('Redis endpoint:', process.env.REDIS_ENDPOINT || 'redis://127.0.0.1:6379')

// Create the queue
const trackingQueue = new Queue('tracking-queue', {
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

// Process jobs
trackingQueue.process(5, async (job) => {
  const { data, slug, eventName, sessionId } = job.data
  const jobId = job.id

  console.log(`🔄 Processing job ${jobId}: ${eventName} for blog ${slug}`)

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

    console.log(`✅ Job ${jobId} completed successfully`)
  } catch (error) {
    console.error(`❌ Job ${jobId} failed:`, error)

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
trackingQueue.on('ready', () => {
  console.log('✅ Queue is ready and connected to Redis')
})

trackingQueue.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed successfully`)
})

trackingQueue.on('failed', (job, error) => {
  console.error(`❌ Job ${job.id} failed after retries:`, error)
})

trackingQueue.on('error', (error) => {
  console.error('❌ Queue error:', error)
})

trackingQueue.on('stalled', (jobId) => {
  console.warn(`⚠️ Job ${jobId} stalled`)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Received SIGTERM, closing queue...')
  await trackingQueue.close()
  await Database.disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('🛑 Received SIGINT, closing queue...')
  await trackingQueue.close()
  await Database.disconnect()
  process.exit(0)
})

console.log('👷 Worker is running and waiting for jobs...')
