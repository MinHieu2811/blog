import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { blogId, eventType, eventData } = req.body

    // 1. Get blog post from MongoDB
    const post = await Database.blog.post.findUnique({
      where: { id: blogId },
      include: { category: true }
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // 2. Track the event in Supabase
    const trackingEvent = await Database.tracking.userTrackingEvent.create({
      data: {
        sessionId: (req.headers['x-session-id'] as string) || 'unknown',
        blogId,
        eventType,
        eventData: {
          ...eventData,
          postTitle: post.title,
          category: post.category.name
        }
      }
    })

    // 3. Return combined data
    res.status(200).json({
      success: true,
      post,
      trackingEvent
    })
  } catch (error) {
    // Log error to Supabase
    await Database.tracking.errorLog.create({
      data: {
        error: error instanceof Error ? error.message : 'Unknown error',
        event: 'api_error',
        eventData: {
          endpoint: '/api/example-dual-db',
          method: req.method,
          body: req.body
        }
      }
    })

    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
