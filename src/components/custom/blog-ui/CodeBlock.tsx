import { highlight } from '@/lib/shiki'
import React, { JSX, useLayoutEffect } from 'react'
import { BundledLanguage } from 'shiki/bundle/web'
import CopyButton from '../CopyButton'

export type CodeBlockProps = {
  content: any
  className?: string
  language: BundledLanguage
}

const CodeBlock: React.FC<CodeBlockProps> = ({ content, className = '', language = 'ts' }) => {
  const [highlightedCode, setHighlightedCode] = React.useState<JSX.Element | null>(null)

  useLayoutEffect(() => {
    highlight(content?.props?.children, language)
      .then(setHighlightedCode)
      .catch((err) => console.error(err))
  }, [content, language])

  return (
    <div className={`${className} relative`}>
      <CopyButton
        buttonConfig={{
          variant: 'default',
          size: 'icon'
        }}
        className="absolute top-4 right-4"
        textToCopy={content?.props?.children}
      />
      {highlightedCode ?? <pre className="p-3 rounded-md border-gray-300">{content?.props?.children}</pre>}
    </div>
  )
}

export default CodeBlock
