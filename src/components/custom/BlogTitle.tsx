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
    <div className={`${className} relative inline-block`}>
      {isLink ? (
        <Link href={href}>
          <Tag className={`${showHover ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-800 after:transition-transform after:duration-300 after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 inline-block' : ''}`}>{children}</Tag>
        </Link>
      ) : (
        <Tag className={`${showHover ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-800 after:transition-transform after:duration-300 after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 inline-block' : ''}`}>{children}</Tag>
      )}
      {!!description?.length && <span>{description}</span>}
    </div>
  )
}

export default BlogTitle
