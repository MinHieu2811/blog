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
        tag={frontmatter?.tag}
      />
      <div className="flex mt-4">
        <div className="flex-1">
          <MDXRemote {...(mdxSource ?? {})} components={mdxComponents} />
        </div>
        <div className="relative">
          <TableOfContent headings={headings} />
        </div>
      </div>
    </article>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await mongo.post.findMany({ select: { slug: true } })

  const paths = posts.map((post) => ({ params: { slug: post?.slug ?? '' } }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { slug } = params as { slug: string }

    const postMetadata = await mongo.post.findUnique({
      where: {
        slug: slug ?? ''
      }
    })
    const data = await fetchMdxContent(slug ?? '')
    const frontmatter = {
      ...(data?.frontmatter ?? {}),
      description: postMetadata?.description,
      tag: postMetadata?.tag
    }

    if (data?.error) {
      return {
        props: {
          status: 500
        }
      }
    }

    return {
      props: { mdxSource: data?.content, frontmatter: frontmatter, headings: data?.headings ?? [] },
      revalidate: 60 // ISR
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error: ', error.stack)
    }
    return {
      props: {
        status: 500
      }
    }
  }
}
