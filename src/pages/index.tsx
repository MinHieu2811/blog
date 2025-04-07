import { MainCard, SubCard } from '@/components/custom/Card'
import { BlogPost, fetchHomeBlogs, HomeBlogs } from '@/services/fetchHomeBlogs'
import ErrorPage from './_error'

// const fakeData = {
//   main: {
//     title: 'Lorem ipsum dolor sit amet ',
//     image: '',
//     link: '/',
//     publishedAt: new Date(),
//     tag: ['tag1', 'tag2', 'tag3']
//   },
//   sub1: {
//     title: 'Lorem ipsum dolor sit amet ',
//     image: '',
//     link: '/',
//     publishedAt: new Date(),
//     tag: ['tag1', 'tag2', 'tag3']
//   },
//   sub2: {
//     title: 'Lorem ipsum dolor sit amet ',
//     image: '',
//     link: '/',
//     publishedAt: new Date(),
//     tag: ['tag1', 'tag2', 'tag3']
//   },
//   sub3: {
//     title: 'Lorem ipsum dolor sit amet ',
//     image: '',
//     link: '/',
//     publishedAt: new Date(),
//     tag: ['tag1', 'tag2', 'tag3']
//   },
//   sub4: {
//     title: 'Lorem ipsum dolor sit amet ',
//     image: '',
//     link: '/',
//     publishedAt: new Date(),
//     tag: []
//   }
// }

type Props = HomeBlogs & {
  status?: number
  error?: string
}

export default function Home({ latest, posts, status }: Props) {
  if (status === 404) return <ErrorPage statusCode={404} message="Post not found." />
  if (status === 500) return <ErrorPage statusCode={500} message="Internal server error." />
  return (
    <div className="container">
      <div className="grid-masonry-container">
        <MainCard {...latest} className="grid-item large" />
        {posts?.map((post: BlogPost, index: number) => (
          <SubCard {...post} key={`${post?.id}-${index}`} className="grid-item medium" placeHeader="top" />
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const data = await fetchHomeBlogs()
    return {
      props: {
        ...data,
        status: 200
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        status: 500,
        error: 'Failed to fetch data'
      }
    }
  }
}
