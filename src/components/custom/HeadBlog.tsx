import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'
import { Badge } from '../ui/badge'

type HeadBlogProps = {
  className?: string
  title?: string
  wordCount?: string
  cover?: string
  publishedAt?: string
  author?: string
  tag?: string[]
}

const HeadBlog = ({ className = '', title, cover, wordCount, publishedAt = '', author, tag = [] }: HeadBlogProps) => {
  return (
    <div className={`${className}`}>
      {cover?.length ? (
        <div className="relative w-full aspect-[16/9] mb-4">
          <Image src={cover} priority className="object-cover rounded-lg" fill alt={title ?? ''} />
        </div>
      ) : (
        <></>
      )}
      <h1 className="text-center text-3xl mb-2">{title}</h1>
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
