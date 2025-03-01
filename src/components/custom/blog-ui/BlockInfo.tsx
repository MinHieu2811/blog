import { TriangleAlert } from 'lucide-react'
import React from 'react'

export type BlockInfoProps = {
  variant: 'info' | 'success' | 'warning' | 'error'
  className?: string
  children: React.ReactNode
}

const BlockInfo = ({ variant, className, children }: BlockInfoProps) => {
  return <div className={`${className} ${variant} relative border-l-2 border-red-300`}>
    <div className="icon">
      <TriangleAlert />
    </div>
    {children}
  </div>
}

export default BlockInfo
