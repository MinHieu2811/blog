import Link from 'next/link'
import { Category } from '@prisma/client'

import ErrorPage from './_error'

import { fetchHomeBlogs, HomeBlogs } from '@/services/fetchHomeBlogs'
import { fetchCategory } from '@/services/fetchCategory'
import BlogList from '@/components/custom/BlogList'
import { Badge } from '@/components/ui/badge'

type Props = HomeBlogs & {
  status?: number
  error?: string
  categories: Category[]
}

export default function Home({ status, posts, categories = [] }: Props) {
  if (status === 404) return <ErrorPage message="Post not found." statusCode={404} />
  if (status === 500) return <ErrorPage message="Internal server error." statusCode={500} />

  return (
    <div className="container">
      <div className="flex gap-11">
        <BlogList className="w-3/4 mt-[-120px] z-10" posts={posts} />
        <div className="w-3/12">
          <h1 className="mb-4 text-xl text-pink-800 font-bold">CATEGORIES</h1>
          <div className="flex flex-row flex-wrap gap-2">
            {categories?.map((category) => (
              <Badge key={category?.id ?? ''} className="inline-flex w-fit px-2 py-1" variant="outline">
                <Link className="text-base" href={`/category/${category?.name}`}>
                  {category?.name}
                </Link>
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
