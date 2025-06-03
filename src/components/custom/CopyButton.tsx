import { useState } from 'react'
import { Copy, Check as CopyCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button, ButtonProps } from '@/components/ui/button'

type CopyButtonProps = {
  className?: string
  textToCopy?: string
  buttonConfig?: ButtonProps
}
const CopyButton = ({ className = '', textToCopy, buttonConfig = {} }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy ?? '')

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Button className={`${className}`} variant="outline" onClick={handleCopy} {...buttonConfig}>
      <AnimatePresence initial={false} mode="wait">
        {copied ? (
          <motion.div
            key="checked"
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            transition={{ duration: 0.1 }}
          >
            <CopyCheck size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -90 }}
            initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
            transition={{ duration: 0.15 }}
          >
            <Copy size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}

export default CopyButton
