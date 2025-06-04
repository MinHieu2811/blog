import { NextApiRequest, NextApiResponse } from 'next'

import { mongo } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

    const { keyword = '' } = req?.query

    const posts = await mongo.post.findMany({
      where: {
        content: {
          contains: keyword as string,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        content: true
      }
    })

    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
