import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { fetchMdxContent } from '@/services/fetchMdxFiles'
import ErrorPage from '@/pages/_error'
import { mongo } from '@/lib/prisma'
import { mdxComponents } from '@/components/custom/blog-ui/MarkdownBlock'
import { extractHeadings } from '@/utils/extractHeadings'
import matter from 'gray-matter'
import { supabase } from '@/lib/supabase'

interface BlogPostProps {
  status: number
  mdxSource: any
  frontmatter: { title: string } | null
}

export default function BlogPost({ status, mdxSource, frontmatter }: BlogPostProps) {
  if (status === 404) return <ErrorPage statusCode={404} message="Post not found." />
  if (status === 500) return <ErrorPage statusCode={500} message="Internal server error." />

  return (
    <article>
      <h1>{frontmatter?.title ?? ''}</h1>
      <MDXRemote {...mdxSource} components={mdxComponents} />
    </article>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const posts = await mongo.post.findMany({ select: { slug: true } })
//   console.log(posts);
//   const paths = posts.map((post) => ({ params: { slug: post.slug } }))

//   return { paths, fallback: true }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   try {
//     const { data, error } = await supabase.storage.from('mdx-articles').download(`test.mdx`)

//     const text = (await data?.text()) ?? ''

//     const { content, data: frontmatter } = matter(text ?? '')
//     const mdxSource = await serialize(content ?? '')
//     const headings = extractHeadings(content)
//     // if (post?.error) return { props: post }

//     return {
//       props: { mdxSource, frontmatter, headings },
//       revalidate: 60 // ISR
//     }
//   } catch (error) {
//     console.error(error)
//     return {
//       props: {
//         status: 500
//       }
//     }
//   }
// }
