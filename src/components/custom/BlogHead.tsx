import Head from 'next/head'
import React from 'react'

import { FrontMatter } from '@/services/fetchMdxFiles'

type BlogHeadProps = Pick<FrontMatter, 'title' | 'description' | 'cover'>

const BlogHead = ({ title, description, cover }: BlogHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={cover} name="image" />
    </Head>
  )
}

export default BlogHead
