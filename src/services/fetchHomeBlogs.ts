export const fetchHomeBlogs = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/list-post')

    const toJson = await res?.json()

    return toJson
  } catch (error) {
    console.error(error)

    return {}
  }
}