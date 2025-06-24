import { NextApiRequest, NextApiResponse } from 'next'
import Queue from 'bull'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const redisUrl = process.env.REDIS_ENDPOINT || 'redis://127.0.0.1:6379'

  console.log('Testing Redis connection to:', redisUrl)

  try {
    const testQueue = new Queue('test-queue', {
      redis: redisUrl,
      defaultJobOptions: {
        removeOnComplete: 1,
        removeOnFail: 1
      }
    })

    await testQueue.add('test', { timestamp: Date.now() })

    const job = await testQueue.getNextJob()

    if (job) {
      await job.remove()
    }

    await testQueue.close()

    res.status(200).json({
      message: 'Redis connection successful',
      redisUrl: redisUrl.replace(/\/\/.*@/, '//***:***@') // Hide credentials
    })
  } catch (error) {
    console.error('Redis test failed:', error)

    res.status(500).json({
      message: 'Redis connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      redisUrl: redisUrl.replace(/\/\/.*@/, '//***:***@'),
      suggestions: [
        'Check if Redis server is running',
        'Verify REDIS_ENDPOINT in .env.local',
        'Check firewall settings',
        'Try redis://127.0.0.1:6379 for local Redis'
      ]
    })
  }
}
