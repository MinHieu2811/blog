import { NextApiRequest, NextApiResponse } from 'next'
import Queue from 'bull'

// Create a simple queue instance for adding jobs
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { data, slug, eventName, sessionId } = req.body

  console.log('📊 Received tracking request:' + eventName)

  if (!eventName || !slug) {
    return res.status(400).json({ message: 'Missing required fields: eventName and slug' })
  }

  try {
    console.log('➕ Adding job to queue:' + eventName)

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

    console.log('✅ Added job to queue successfully')
    res.status(200).json({ message: 'OK' })
  } catch (error) {
    console.error('❌ Failed to add job to queue:', error)

    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
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
