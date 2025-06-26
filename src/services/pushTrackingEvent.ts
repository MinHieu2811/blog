import { axiosInstance } from '@/lib/axios'

export interface TrackingEventData {
  sessionId?: string
  slug?: string
  eventName?: string
  data?: Record<string, any>
}

// In-memory queue để batch requests
let eventQueue: TrackingEventData[] = []
let isProcessing = false

const processQueue = async () => {
  if (isProcessing || eventQueue.length === 0) return

  isProcessing = true
  const eventsToProcess = [...eventQueue]

  eventQueue = []

  try {
    // Batch process events
    await Promise.allSettled(eventsToProcess.map((event) => sendSingleEvent(event)))
  } catch (error) {
    console.error('Failed to process event queue:', error)
  } finally {
    isProcessing = false

    // Process remaining events if any were added during processing
    if (eventQueue.length > 0) {
      setTimeout(processQueue, 100)
    }
  }
}

const sendSingleEvent = async (data: TrackingEventData, retries = 3): Promise<void> => {
  for (let i = 0; i < retries; i++) {
    try {
      // Skip if missing required fields
      if (!data.eventName || !data.slug) {
        console.error('Missing required fields: eventName or slug')

        break
      }

      const response = await axiosInstance.post('/tracking', data, {
        timeout: 5000 // 5 second timeout
      })

      if (response.status === 200) {
        return
      }
    } catch (err) {
      console.error(`Retry ${i + 1} failed for event ${data.eventName}:`, err)

      if (i === retries - 1) {
        console.error('Max retries reached, event dropped:', data.eventName)
        // Could store failed events in localStorage for retry later
        storeFailedEvent(data)
      }

      // Exponential backoff
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, i) * 1000))
      }
    }
  }
}

const storeFailedEvent = (event: TrackingEventData) => {
  try {
    const failedEvents = JSON.parse(localStorage.getItem('failedTrackingEvents') || '[]')

    failedEvents.push({ ...event, timestamp: Date.now() })

    // Keep only last 50 failed events
    if (failedEvents.length > 50) {
      failedEvents.splice(0, failedEvents.length - 50)
    }

    localStorage.setItem('failedTrackingEvents', JSON.stringify(failedEvents))
  } catch (error) {
    console.error('Failed to store failed event:', error)
  }
}

export const sendTrackingEvent = async (data: TrackingEventData) => {
  eventQueue.push(data)

  setTimeout(processQueue, 100)
}

export const retryFailedEvents = async () => {
  try {
    const failedEvents = JSON.parse(localStorage.getItem('failedTrackingEvents') || '[]')

    if (failedEvents.length > 0) {
      console.log(`Retrying ${failedEvents.length} failed tracking events`)

      for (const event of failedEvents) {
        await sendSingleEvent(event, 1) // Single retry for failed events
      }

      localStorage.removeItem('failedTrackingEvents')
    }
  } catch (error) {
    console.error('Failed to retry failed events:', error)
  }
}
