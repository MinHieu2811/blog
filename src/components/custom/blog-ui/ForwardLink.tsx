import Link from 'next/link'
import React, { useState } from 'react'

import ExternalLink from '@/components/icons/ExternalLink'

export type ForwardLinkProps = {
  text: string
  href: string
  className?: string
  openNewTab?: boolean
  icon?: React.ReactElement<{ isHovered?: boolean }>
}

const ForwardLink = ({
  href,
  text,
  openNewTab = true,
  icon = <ExternalLink hoverFill="#0070f3" size={16} />,
  className = ''
}: ForwardLinkProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      {...(openNewTab ? { target: '_blank' } : {})}
      className={`border-b-2 items-center inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="flex items-center">
        {text}
        <span className="ml-2">{React.isValidElement(icon) && React.cloneElement(icon, { isHovered })}</span>
      </span>
    </Link>
  )
}

export default ForwardLink
