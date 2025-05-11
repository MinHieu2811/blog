import { fetchHomeBlogs, HomeBlogs } from '@/services/fetchHomeBlogs'
import ErrorPage from './_error'
import { fetchCategory } from '@/services/fetchCategory'
import { Category } from '@prisma/client'
import BlogList from '@/components/custom/BlogList'
type Props = HomeBlogs & {
  status?: number
  error?: string
  categories: Category[]
}

export default function Home({ status, posts }: Props) {
  if (status === 404) return <ErrorPage statusCode={404} message="Post not found." />
  if (status === 500) return <ErrorPage statusCode={500} message="Internal server error." />
  return (
    <div className="container">
      <BlogList posts={posts} />
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const listBlogs = await fetchHomeBlogs()
    const listCategory = await fetchCategory()
    return {
      props: {
        posts: listBlogs?.posts ?? [],
        categories: listCategory,
        status: 200
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        status: 500,
        posts: [],
        categories: [],
        error: 'Failed to fetch data'
      }
    }
  }
}
