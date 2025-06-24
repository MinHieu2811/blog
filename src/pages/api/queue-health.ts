import { NextApiRequest, NextApiResponse } from 'next'

import { getQueueHealth } from '@/services/worker'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const health = await getQueueHealth()

    res.status(200).json(health)
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
