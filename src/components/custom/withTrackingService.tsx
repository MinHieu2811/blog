import useBlogTracking from '@/hooks/useTrackingEvent'

const withBlogTracking = (WrappedComponent: React.ComponentType<any>) => {
  const WithBlogTracking = (props: any) => {
    const { lastElementRef } = useBlogTracking({ slug: props?.slug ?? '' })

    return (
      <div>
        <WrappedComponent {...props} />
        <div ref={lastElementRef} style={{ height: '1px', width: '1px', backgroundColor: 'red' }} />
      </div>
    )
  }

  WithBlogTracking.displayName = `WithBlogTracking(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return WithBlogTracking
}

export default withBlogTracking
