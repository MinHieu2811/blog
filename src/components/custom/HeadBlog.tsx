import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import React from 'react'
import { Badge } from '../ui/badge'
import { Post } from '@prisma/client'

type HeadBlogProps = Pick<Post, 'title' | 'cover' | 'publishedAt' | 'tag'> & {
  className?: string
  wordCount?: string
  author?: string
}

const HeadBlog = ({ className = '', title, wordCount, publishedAt = new Date(), author = 'ChatGPT', tag = [] }: HeadBlogProps) => {
  return (
    <div className={`${className}`}>
      <h1 className="text-center text-4xl mb-2">{title}</h1>
      <div className="flex justify-center items-center h-5">
        {author?.length ? (
          <>
            <div className="text-sm">{author}</div>
            <Separator orientation="vertical" className="mx-2" />
          </>
        ) : (
          <></>
        )}
        <div className="text-sm">{wordCount}</div>
        <Separator orientation="vertical" className="mx-2" />
        <div className="text-sm">{format(publishedAt, 'dd MMM yyyy')}</div>
      </div>
      <div className="flex items-center justify-center mt-2">
        {tag?.map((item) => (
          <Badge key={item} className={`mr-2`} variant="secondary">
            #{item}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default HeadBlog
