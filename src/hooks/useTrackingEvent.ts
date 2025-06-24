import { useEffect, useRef, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { sendTrackingEvent, TrackingEventData } from '@/services/pushTrackingEvent'
import { checkIsClient } from '@/utils/checkIsClient'

type EventName = 'page_view' | 'time_on_page' | 'scroll_depth' | 'blog_completed' | 'drop_position'

interface PayloadTrackingEventData extends TrackingEventData {
  [key: string]: any
}

const useBlogTracking = ({ slug }: { slug: string }) => {
  const lastElementRef = useRef<HTMLDivElement | null>(null)
  const scrollMilestones = useRef(new Set())
  const startTimeRef = useRef<number | null>(null)
  const sessionId = useRef(uuidv4())
  const isTrackingEnabled = useRef(true)

  const debouncedTrack = useCallback(
    (eventName: EventName, data: PayloadTrackingEventData) => {
      if (!isTrackingEnabled.current) return

      setTimeout(() => {
        sendTrackingEvent({
          sessionId: sessionId.current,
          slug,
          eventName,
          data
        })
      }, 100)
    },
    [slug]
  )

  useEffect(() => {
    if (!checkIsClient()) return

    localStorage.setItem('trackingSessionId', sessionId.current)

    const trackingDisabled = localStorage.getItem('trackingDisabled') === 'true'

    isTrackingEnabled.current = !trackingDisabled

    debouncedTrack('page_view', {
      url: window.location.href,
      referrer: document.referrer
    })
  }, [debouncedTrack])

  useEffect(() => {
    if (!checkIsClient()) return

    startTimeRef.current = performance.now()

    const handleUnload = () => {
      if (!isTrackingEnabled.current) return

      const timeSpent = (performance.now() - (startTimeRef.current ?? 0)) / 1000

      if (navigator.sendBeacon) {
        const data = JSON.stringify({
          sessionId: sessionId.current,
          slug,
          eventName: 'time_on_page',
          data: { timeSpent }
        })

        navigator.sendBeacon('/api/tracking', data)
      } else {
        debouncedTrack('time_on_page', { timeSpent })
      }
    }

    window.addEventListener('beforeunload', handleUnload)
    window.addEventListener('pagehide', handleUnload)

    return () => {
      window.removeEventListener('beforeunload', handleUnload)
      window.removeEventListener('pagehide', handleUnload)
    }
  }, [slug, debouncedTrack])

  useEffect(() => {
    const trackScroll = () => {
      if (!checkIsClient() || !isTrackingEnabled.current) return

      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100

      const milestones = [25, 50, 75, 100]

      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone)
          debouncedTrack('scroll_depth', { milestone, scrollPercentage })
        }
      })
    }

    window.addEventListener('scroll', trackScroll, { passive: true })

    return () => window.removeEventListener('scroll', trackScroll)
  }, [debouncedTrack])

  useEffect(() => {
    if (!checkIsClient()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isTrackingEnabled.current) {
          debouncedTrack('blog_completed', {
            completedAt: new Date().toISOString()
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current)
    }

    return () => observer.disconnect()
  }, [debouncedTrack])

  useEffect(() => {
    const handleDrop = () => {
      if (!checkIsClient()) return

      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100

      sendTrackingEvent({
        sessionId: sessionId.current,
        slug,
        eventName: 'drop_position',
        data: { scrollPercentage }
      })
    }

    window.addEventListener('beforeunload', handleDrop)

    return () => window.removeEventListener('beforeunload', handleDrop)
  }, [slug])

  return { lastElementRef }
}

export default useBlogTracking
