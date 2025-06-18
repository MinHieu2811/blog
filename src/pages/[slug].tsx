import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { fetchMdxContent, FrontMatter } from '@/services/fetchMdxFiles'
import ErrorPage from '@/pages/_error'
import { mongo } from '@/lib/prisma'
import HeadBlog from '@/components/custom/HeadBlog'
import { estimatedReadingTime } from '@/utils/estimatedReadingTime'
import { mdxComponents } from '@/components/custom/blog-ui/MarkdownBlock'
import TableOfContent from '@/components/custom/TableOfContent'
import BlogHead from '@/components/custom/BlogHead'

interface BlogPostProps {
  status: number
  mdxSource: MDXRemoteSerializeResult
  frontmatter: (FrontMatter & { estimatedTime: string }) | null
  headings: Array<{ text: string; level: number }>
  slug: string
}

export default function BlogPost({ status, mdxSource, frontmatter, headings }: BlogPostProps) {
  if (!frontmatter) return <></>

  if (status === 404) return <ErrorPage message="Post not found." statusCode={404} />
  if (status === 500) return <ErrorPage message="Internal server error." statusCode={500} />

  return (
    <>
      <BlogHead
        cover={frontmatter?.cover ?? ''}
        description={frontmatter?.description ?? ''}
        title={frontmatter?.title ?? ''}
      />
      <article>
        <HeadBlog
          author={frontmatter?.author}
          cover={frontmatter?.cover ?? ''}
          keyword={frontmatter?.tag ?? []}
          publishedAt={new Date(frontmatter?.date ?? '')}
          title={frontmatter?.title ?? ''}
          wordCount={frontmatter?.estimatedTime ?? ''}
        />
        <div className="flex mt-4 gap-11">
          <div className="flex-1 text-justify">
            <MDXRemote {...(mdxSource ?? {})} components={mdxComponents} />
          </div>
          <div className="relative">
            <TableOfContent headings={headings} />
          </div>
        </div>
      </article>
    </>
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
    const estimatedTime = estimatedReadingTime(
      (data?.content as MDXRemoteSerializeResult)?.compiledSource?.replace(/<[^>]*>/g, '')
    )
    const frontmatter = {
      ...(data?.frontmatter ?? {}),
      description: postMetadata?.description,
      tag: postMetadata?.keyword,
      estimatedTime: estimatedTime
    }

    if (data?.error) {
      return {
        props: {
          status: 500,
          mdxSource: '',
          frontmatter,
          headings: [],
          slug: slug
        }
      }
    }

    return {
      props: {
        mdxSource: data?.content,
        frontmatter: frontmatter,
        headings: data?.headings ?? [],
        slug: slug
      },
      revalidate: 60 // ISR
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error: ', error.stack)
    }

    return {
      props: {
        status: 500,
        mdxSource: '',
        frontmatter: {},
        headings: [],
        slug: ''
      }
    }
  }
}
