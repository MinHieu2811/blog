import React, { FC, JSX, useEffect, useState } from 'react'

type LoaderType = () => Promise<React.ComponentType<Record<string, unknown>>>
type RenderPlaceholderType = ({ height }: { height?: number }) => JSX.Element | null

interface AsyncComponentProps {
  loader: LoaderType
  renderPlaceholder?: RenderPlaceholderType
  placeholderHeight?: number
  [key: string]: any
}

const AsyncComponent: FC<AsyncComponentProps> = ({ loader, renderPlaceholder, placeholderHeight, ...rest }) => {
  const [Component, setComponent] = useState<React.ComponentType<Record<string, unknown>> | null>(null)

  useEffect(() => {
    let isMounted = true

    loader().then((loadedComponent) => {
      if (isMounted) {
        setComponent(() => loadedComponent)
      }
    })

    return () => {
      isMounted = false
    }
  }, [loader])

  if (Component) {
    return <Component {...rest} />
  }

  return renderPlaceholder ? renderPlaceholder({ height: placeholderHeight }) : null
}

export default AsyncComponent
