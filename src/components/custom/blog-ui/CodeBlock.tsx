import { highlight } from '@/lib/shiki'
import React, { JSX, useLayoutEffect } from 'react'
import { BundledLanguage } from 'shiki/bundle/web'

export type CodeBlockProps = {
  content: any
  className?: string
  language: BundledLanguage
}

const CodeBlock: React.FC<CodeBlockProps> = ({ content, className = '', language = 'ts' }) => {
  const [highlightedCode, setHighlightedCode] = React.useState<JSX.Element | null>(null)

  useLayoutEffect(() => {
    highlight(content?.props?.children, language).then(setHighlightedCode).catch((err) => console.error(err))
  }, [content, language])

  return (
    <div className={`${className}`}>
      {highlightedCode ?? (
        <pre>
          {content?.props?.children}
        </pre>
      )}
    </div>
  )
}

export default CodeBlock
