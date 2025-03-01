import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import React from 'react'

type HeadBlogProps = {
  className?: string
  title?: string
  wordCount?: string
  imageCover?: string
  publishedAt?: string
  author?: string
}

const HeadBlog = ({ className = '', title, imageCover, wordCount, publishedAt = '', author }: HeadBlogProps) => {
  return (
    <div className={`${className}`}>
      <h1 className="text-center text-3xl mb-2">{title}</h1>
      {imageCover?.length ? <img src={imageCover} className="object-cover" alt={title} /> : <></>}
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
    </div>
  )
}

export default HeadBlog
