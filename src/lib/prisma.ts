import { PrismaClient } from '@prisma/client'

import { PrismaClient as TrackingPrismaClient } from './tracking-client'

// MongoDB client for blog data (Posts, Categories)
const mongo = new PrismaClient()

// Supabase client for tracking data (UserTrackingEvent, ErrorLog)
const supabase = new TrackingPrismaClient()

export { mongo, supabase }
