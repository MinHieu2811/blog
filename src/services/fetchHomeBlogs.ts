import { Post } from '@prisma/client'

import { axiosInstance } from '@/lib/axios'

export type HomeBlogs = {
  posts: Post[]
}

export const fetchHomeBlogs = async (): Promise<HomeBlogs> => {
  try {
    const res = await axiosInstance.get('/list-post')

    return res?.data
  } catch (error) {
    console.error(error)

    return {
      posts: []
    }
  }
}
