import { format } from 'date-fns'
import React from 'react'
import { Post } from '@prisma/client'

import { Badge } from '../ui/badge'

import { Separator } from '@/components/ui/separator'

type HeadBlogProps = Pick<Post, 'title' | 'cover' | 'publishedAt' | 'keyword'> & {
  className?: string
  wordCount?: string
  author?: string
}

const HeadBlog = ({
  className = '',
  title,
  wordCount,
  publishedAt = new Date(),
  author = 'ChatGPT',
  keyword = []
}: HeadBlogProps) => {
  return (
    <div className={`${className}`}>
      <h1 className="text-center text-4xl mb-2">{title}</h1>
      <div className="flex justify-center items-center h-5">
        {author?.length ? (
          <>
            <div className="text-sm">{author}</div>
            <Separator className="mx-2" orientation="vertical" />
          </>
        ) : (
          <></>
        )}
        <div className="text-sm">{wordCount}</div>
        {/* <Separator className="mx-2" orientation="vertical" />
        <div className="text-sm">{format(publishedAt ?? new Date(), 'dd MMM yyyy')}</div> */}
      </div>
      <div className="flex items-center justify-center mt-2">
        {keyword?.map((item) => (
          <Badge key={item} className={`mr-2`} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default HeadBlog
