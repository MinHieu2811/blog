import CopyIcon from '@/components/icons/Copy'
import { Button } from '@/components/ui/button'
import { highlight } from '@/lib/shiki'
import { onCopy } from '@/utils/handleCopy'
import { Copy } from 'lucide-react'
import React, { JSX, useLayoutEffect } from 'react'
import { BundledLanguage } from 'shiki/bundle/web'
import { toast } from 'sonner'

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

  const handleCopy = (content?: string) => {
    toast?.success('Copied to clipboard successfully!')
    onCopy(content ?? '')
  }

  return (
    <div className={`${className} relative`}>
      <Button
        variant="default"
        className="absolute top-4 right-4"
        onClick={() => handleCopy(content?.props?.children ?? '')}
      >
        <Copy />
      </Button>
      {highlightedCode ?? <pre className="p-3 rounded-md border-gray-300">{content?.props?.children}</pre>}
    </div>
  )
}

export default CodeBlock
