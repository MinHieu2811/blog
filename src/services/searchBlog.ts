import axios, { CancelTokenSource } from 'axios'

export const handleSearchBlog = async (keyword: string, cancelToken: CancelTokenSource) => {
  try {
    const response = await axios.get(`/api/search?keyword=${keyword}`, {
      cancelToken: cancelToken?.token
    })
    return response?.data
  } catch (error) {
    console?.error(error)
  }
}