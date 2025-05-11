import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

type BlogTitleProps = {
  className?: string
  tag?: keyof HTMLElementTagNameMap
  description?: string
  showHover?: boolean
  isLink?: boolean
  href?: string
}

const BlogTitle = ({
  className = '',
  tag,
  description = '',
  showHover,
  children,
  isLink = false,
  href = ''
}: PropsWithChildren<BlogTitleProps>) => {
  const Tag = tag ?? 'h6'
  if(isLink && !href?.length) {
    throw Error('href is missing from a link')
  }
  return (
    <div className={`${className}`}>
      {isLink ? (
        <Link href={href}>
          <Tag className={`${showHover ? 'hover:border-blue-800 hover:border-b inline-block' : ''}`}>{children}</Tag>
        </Link>
      ) : (
        <Tag className={`${showHover ? 'hover:border-blue-800 hover:border-b inline-block' : ''}`}>{children}</Tag>
      )}
      {!!description?.length && <span>{description}</span>}
    </div>
  )
}

export default BlogTitle
