import { fetchHomeBlogs, HomeBlogs } from '@/services/fetchHomeBlogs'
import ErrorPage from './_error'
import { fetchCategory } from '@/services/fetchCategory'
import { Category } from '@prisma/client'
import BlogList from '@/components/custom/BlogList'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
type Props = HomeBlogs & {
  status?: number
  error?: string
  categories: Category[]
}

export default function Home({ status, posts, categories = [] }: Props) {
  if (status === 404) return <ErrorPage statusCode={404} message="Post not found." />
  if (status === 500) return <ErrorPage statusCode={500} message="Internal server error." />
  return (
    <div className="container">
      <div className="flex gap-9">
        <BlogList posts={posts} className="w-3/4" />
        <div className="w-3/12">
          <h1 className="mb-4 text-xl text-pink-800 font-bold">CATEGORIES</h1>
          <div className="flex flex-row flex-wrap gap-2">
            {categories?.map((category) => (
              <Badge key={category?.id ?? ''} variant="outline" className="inline-flex w-fit px-2 py-1">
                <Link href={`/category/${category?.name}`} className='text-base'>{category?.name}</Link>
              </Badge>
            ))}
          </div>
        </div>
      </div>
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
