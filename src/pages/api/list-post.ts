import { NextApiRequest, NextApiResponse } from 'next'

import { mongo } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

    const posts = await mongo.post.findMany({
      select: {
        slug: true,
        title: true,
        publishedAt: true,
        description: true,
        cover: true,
        keyword: true,
        categoryId: true
      },
      orderBy: { publishedAt: 'desc' }
    })

    res.json({
      posts
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
