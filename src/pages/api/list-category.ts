import { NextApiRequest, NextApiResponse } from 'next'

import { mongo } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

    const categories = await mongo.category.findMany({
      select: { id: true, name: true }
    })

    res.json(categories)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
