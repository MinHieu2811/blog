import { Category } from '@prisma/client'

import { axiosInstance } from '@/lib/axios'

export const fetchCategory = async (): Promise<Category[]> => {
  try {
    const res = await axiosInstance.get<Category[]>('/list-category')

    return res?.data
  } catch (error) {
    console.error(error)

    return []
  }
}
