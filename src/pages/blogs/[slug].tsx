import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { fetchMdxContent } from '@/services/fetchMdxFiles'
import ErrorPage from '@/pages/_error'
import { mongo } from '@/lib/prisma'
import { mdxComponents } from '@/components/custom/blog-ui/MarkdownBlock'

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { slug } = params as { slug: string }
    console.log(slug);
    // const post = await fetchMdxContent('test')
    const source = 'Some **mdx** text, with a component <Test />'
    const mdxSource = await serialize(source ?? '')
    // if (post?.error) return { props: post }

    return {
      props: { source, mdxSource },
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
