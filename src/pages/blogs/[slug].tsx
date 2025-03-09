import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { fetchMdxContent, FrontMatter } from '@/services/fetchMdxFiles'
import ErrorPage from '@/pages/_error'
import { mongo } from '@/lib/prisma'
import { mdxComponents } from '@/components/custom/blog-ui/MarkdownBlock'
import HeadBlog from '@/components/custom/HeadBlog'
import { estimatedReadingTime } from '@/utils/estimatedReadingTime'
import { useMemo } from 'react'
import TableOfContent from '@/components/custom/TableOfContent'

interface BlogPostProps {
  status: number
  mdxSource: MDXRemoteSerializeResult
  frontmatter: FrontMatter | null
  headings: Array<{ text: string; level: number }>
}

export default function BlogPost({ status, mdxSource, frontmatter, headings }: BlogPostProps) {
  const estimatedTime: string = useMemo(() => {
    const textContent = mdxSource?.compiledSource?.replace(/<[^>]*>/g, '')
    return estimatedReadingTime(textContent)
  }, [mdxSource])

  if (status === 404) return <ErrorPage statusCode={404} message="Post not found." />
  if (status === 500) return <ErrorPage statusCode={500} message="Internal server error." />
  return (
    <article>
      <HeadBlog
        title={frontmatter?.title}
        wordCount={estimatedTime}
        author={frontmatter?.author}
        publishedAt={frontmatter?.date}
        cover={frontmatter?.cover}
      />
      <div className="flex">
        <div className="flex-1">
          <MDXRemote {...mdxSource} components={mdxComponents} />
        </div>
        <div className="relative">
          <TableOfContent headings={headings} />
        </div>
      </div>
    </article>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await mongo.post.findMany({ select: { slug: true, content: true } })
  const paths = posts.map((post) => ({ params: { slug: post?.slug ?? '', content: post?.content ?? '' } }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { slug = '' } = params as { slug?: string; content?: string }
    const data = await fetchMdxContent(slug)

    if (data?.error) {
      return {
        props: {
          status: 500
        }
      }
    }

    return {
      props: { mdxSource: data?.content, frontmatter: data?.frontmatter, headings: data?.headings ?? [] },
      revalidate: 60 // ISR
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        status: 500
      }
    }
  }
}
