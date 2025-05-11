import React, { useCallback } from 'react'
import BlogTitle from './BlogTitle'
import { Post } from '@prisma/client'
import { cn } from '@/lib/utils'
import ArrowRight from '../icons/ArrowRight'
import { IconButton } from '../ui/icon-button'
import { useRouter } from 'next/router'

type BlogListProps = {
  className?: string
  posts: Post[]
}

const BlogList = ({ className, posts }: BlogListProps) => {
  return (
    <div className={cn('list-post', className)}>
      <h1 className="mb-4 text-lg text-pink-800 font-bold">ARTICLES</h1>
      {posts.map((post) => (
        <BlogListItem key={post.id} {...post} />
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])
  return (
    <div className={cn('blog-list-item', className)}>
      <BlogTitle tag="h4" showHover isLink href={`/blogs/${slug}`}>
        {title}
      </BlogTitle>
      <p className="text-sm text-gray-500">{description}</p>
      <IconButton 
        variant="link"
        icon={<ArrowRight size={24} />}
        onClick={handleReadMore}
        className='text-white px-0 hover:no-underline'
      >
        Read More
      </IconButton>
    </div>
  )
}

export default BlogList
