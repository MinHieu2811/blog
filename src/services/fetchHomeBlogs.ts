import { axiosInstance } from '@/lib/axios'
import { Post } from '@prisma/client'

export type BlogPost = Pick<Post, 'content' | 'cover' | 'description' | 'publishedAt' | 'slug' | 'tag' | 'title'> & {
  id: string
}

export type HomeBlogs = {
  latest: BlogPost
  posts: BlogPost[]
}

export const fetchHomeBlogs = async (): Promise<HomeBlogs> => {
  try {
    const res = await axiosInstance.get('/list-post')

    return res?.data
  } catch (error) {
    console.error(error)

    return {
      latest: {
        id: '',
        title: '',
        slug: '',
        content: '',
        description: '',
        publishedAt: new Date(),
        cover: '',
        tag: []
      },
      posts: []
    }
  }
}
