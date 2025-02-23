import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { fetchMdxContent } from '@/services/fetchMdxFiles'
import ErrorPage from '@/pages/_error'
import { mongo } from '@/lib/prisma'
import { mdxComponents } from '@/components/custom/blog-ui/MarkdownBlock'
import { supabase } from '@/lib/supabase'
import matter from 'gray-matter'
import { extractHeadings } from '@/utils/extractHeadings'
import HeadBlog from '@/components/custom/HeadBlog'
import { estimatedReadingTime } from '@/utils/estimatedReadingTime'
import { useMemo } from 'react'
import TableOfContent from '@/components/custom/TableOfContent'

interface BlogPostProps {
  status: number
  mdxSource: any
  frontmatter: { title: string; date: string; author: string } | null
  headings: Array<{ text: string; level: number }>
}

const Test = ({ status, mdxSource, frontmatter, headings }: BlogPostProps) => {
  const estimatedTime: string = useMemo(() => {
    const textContent = mdxSource.compiledSource.replace(/<[^>]*>/g, '')
    return estimatedReadingTime(textContent)
  }, [mdxSource])

  if (status === 404) return <ErrorPage statusCode={404} message="Post not found." />
  if (status === 500) return <ErrorPage statusCode={500} message="Internal server error." />
  return (
    <article>
      <h1>{frontmatter?.title ?? ''}</h1>
      <HeadBlog
        title={frontmatter?.title}
        wordCount={estimatedTime}
        author={frontmatter?.author}
        publishedAt={frontmatter?.date}
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

// export const getStaticPaths: GetStaticPaths = async () => {
//   const posts = await mongo.post.findMany({ select: { slug: true } })
//   console.log(posts);
//   const paths = posts.map((post) => ({ params: { slug: post.slug } }))

//   return { paths, fallback: true }
// }

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    // const { slug } = params as { slug: string }
    // console.log(slug);
    const { data, error } = await supabase.storage.from('mdx-articles').download(`test.mdx`)

    const text = (await data?.text()) ?? ''

    const { content, data: frontmatter } = matter(text ?? '')
    const mdxSource = await serialize(content ?? '')
    const headings = extractHeadings(content)
    // if (post?.error) return { props: post }

    return {
      props: { mdxSource, frontmatter, headings },
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

export default Test
