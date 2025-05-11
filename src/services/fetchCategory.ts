import { axiosInstance } from "@/lib/axios"
import { Category } from "@prisma/client"


export const fetchCategory = async (): Promise<Category[]> => {
  try {
    const res = await axiosInstance.get<Category[]>('/list-category')

    return res?.data
  } catch (error) {
    console.error(error)

    return []
  }
}