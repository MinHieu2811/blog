import React, { useCallback } from 'react'
import { Post } from '@prisma/client'
import { useRouter } from 'next/router'

import ArrowRight from '../icons/ArrowRight'
import { IconButton } from '../ui/icon-button'

import BlogTitle from './BlogTitle'

import { cn } from '@/lib/utils'

type BlogListProps = {
  className?: string
  posts: Post[]
}

const BlogList = ({ className, posts }: BlogListProps) => {
  return (
    <div className={cn('list-post', className)}>
      <h1 className="mb-4 text-xl text-pink-800 font-bold">ARTICLES</h1>
      {posts.map((post) => (
        <BlogListItem key={post.id} {...post} className="mb-5" />
      ))}
    </div>
  )
}

type BlogListItemProps = Post & {
  className?: string
}

const BlogListItem = ({ className, slug, title, description }: BlogListItemProps) => {
  const router = useRouter()
  const handleReadMore = useCallback(() => {
    router.push(`/blogs/${slug}`)
  }, [slug])

  return (
    <div className={cn('blog-list-item', className)}>
      <BlogTitle isLink showHover className="text-xl mb-2" href={`/blogs/${slug}`} tag="h4">
        {title}
      </BlogTitle>
      <p className="text-base text-gray-500 text-justify">{description}</p>
      <IconButton
        className="text-blue-500 px-0 text-base hover:no-underline"
        icon={<ArrowRight size={24} />}
        variant="link"
        onClick={handleReadMore}
      >
        Read More
      </IconButton>
    </div>
  )
}

export default BlogList
