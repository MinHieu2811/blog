import { NextApiRequest, NextApiResponse } from 'next'
import Queue from 'bull'

// Test Redis connection
const testRedisConnection = async () => {
  try {
    const testQueue = new Queue('test-queue', {
      redis: process.env.REDIS_ENDPOINT || 'redis://127.0.0.1:6379',
      defaultJobOptions: {
        removeOnComplete: 1,
        removeOnFail: 1
      }
    })

    await testQueue.add('test', { test: true })
    await testQueue.close()

    return true
  } catch (error) {
    console.error('Redis connection test failed:', error)

    return false
  }
}

const trackingQueue = new Queue('tracking-queue', {
  redis: process.env.REDIS_ENDPOINT || 'redis://127.0.0.1:6379',
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 50,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  }
})

// Add connection event listeners
trackingQueue.on('error', (error) => {
  console.error('Queue error:', error)
})

trackingQueue.on('ready', () => {
  console.log('Queue is ready')
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { data, slug, eventName, sessionId } = req.body

  console.log('Received request:', { data, slug, eventName, sessionId })
  console.log('Redis endpoint:', process.env.REDIS_ENDPOINT || 'redis://127.0.0.1:6379')

  if (!eventName || !slug) {
    return res.status(400).json({ message: 'Missing required fields: eventName and slug' })
  }

  try {
    // Test Redis connection first
    const isRedisConnected = await testRedisConnection()

    if (!isRedisConnected) {
      console.error('Redis connection failed')

      return res.status(500).json({
        message: 'Redis connection failed',
        error: 'Cannot connect to Redis server'
      })
    }

    await trackingQueue.add(
      {
        data: data || {},
        slug,
        eventName,
        sessionId
      },
      {
        priority: getEventPriority(eventName)
      }
    )

    console.log('Added job to queue successfully')
    res.status(200).json({ message: 'OK' })
  } catch (error) {
    console.error('Failed to add job to queue:', error)

    // More detailed error response
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined
    })
  }
}

function getEventPriority(eventName: string): number {
  const priorities: Record<string, number> = {
    blog_completed: 1,
    scroll_depth: 2,
    time_on_page: 3,
    drop_position: 4
  }

  return priorities[eventName] || 5
}
