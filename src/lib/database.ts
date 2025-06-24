import { PrismaClient } from './blog-client'
import { PrismaClient as TrackingPrismaClient } from './tracking-client'

const mongo = new PrismaClient()

const supabase = new TrackingPrismaClient()

export class Database {
  static get blog() {
    return mongo
  }

  static get tracking() {
    return supabase
  }

  static async getPosts() {
    return await mongo.post.findMany({
      include: {
        category: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })
  }

  static async getCategories() {
    return await mongo.category.findMany({
      include: {
        posts: true
      }
    })
  }

  static async trackEvent(sessionId: string, blogId: string, eventType: string, eventData: any) {
    return await supabase.userTrackingEvent.create({
      data: {
        sessionId,
        blogId,
        eventType,
        eventData
      }
    })
  }

  static async logError(error: string, event: string, eventData: any) {
    return await supabase.errorLog.create({
      data: {
        error,
        event,
        eventData
      }
    })
  }

  static async disconnect() {
    await mongo.$disconnect()
    await supabase.$disconnect()
  }
}

export { mongo, supabase }
