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
      <title className="text-center">{title}</title>
      {imageCover?.length ? <img src={imageCover} className="object-cover" alt={title} /> : <></>}
      <div className="flex justify-center items-center">
        {author?.length ? (
          <>
            <p className="text-sm">{author}</p>
            <Separator orientation="vertical" className="mx-2" />
          </>
        ) : (
          <></>
        )}
        <p className="text-sm">{wordCount}</p>
        <Separator orientation="vertical" className="mx-2" />
        <p className="text-sm">{format(publishedAt, 'dd MMM yyyy')}</p>
      </div>
    </div>
  )
}

export default HeadBlog
