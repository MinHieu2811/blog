import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export type ForwardLinkProps = {
  text: string
  href: string
  className?: string
  openNewTab?: boolean
  icon?: React.ReactNode
}

const ForwardLink = ({ href, text, openNewTab = true, icon = <ExternalLink size={16} />, className = '' }: 
  ForwardLinkProps) => {
  return (
    <Link href={href} {...(openNewTab ? { target: '_blank' } : {})} className={`border-b-2 items-center inline-block ${className}`}>
      <span className='flex items-center'>
        {text}
        <span className="ml-2">{icon}</span>
      </span>
    </Link>
  )
}

export default ForwardLink
