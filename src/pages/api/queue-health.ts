import { NextApiRequest, NextApiResponse } from 'next'
import Queue from 'bull'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Create a temporary queue instance to check health
    const trackingQueue = new Queue('tracking-queue', {
      redis: process.env.REDIS_ENDPOINT || 'redis://127.0.0.1:6379'
    })

    const waiting = await trackingQueue.getWaiting()
    const active = await trackingQueue.getActive()
    const completed = await trackingQueue.getCompleted()
    const failed = await trackingQueue.getFailed()

    await trackingQueue.close()

    res.status(200).json({
      status: 'healthy',
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
      timestamp: new Date().toISOString(),
      redis_endpoint: process.env.REDIS_ENDPOINT ? 'configured' : 'not_configured'
    })
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      redis_endpoint: process.env.REDIS_ENDPOINT ? 'configured' : 'not_configured'
    })
  }
}
