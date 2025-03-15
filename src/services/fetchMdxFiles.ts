import matter from 'gray-matter'
import { supabase } from '@/lib/supabase'
import { extractHeadings } from '@/utils/extractHeadings'
import { serialize } from 'next-mdx-remote/serialize'

export type FrontMatter = {
  title?: string
  date?: string
  author?: string
  cover?: string
  description?: string
  tag?: string[]
}

export async function fetchMdxContent(slug: string) {
  try {
    if (!slug) {
      throw new Error('This post does not exist!')
    }
    const { data, error } = await supabase.storage.from('mdx-articles').download(`${slug}.mdx`)
    // const { data, error } = await supabase.storage.getBucket("mdx-articles")

    if (error) {
      console.error('Error fetching MDX file:', JSON.stringify(error))
      return null
    }

    const text = await data?.text()
    const { content, data: frontmatter } = matter(text)
    const mdxSource = await serialize(content ?? '')

    const headings = extractHeadings(content)
    return { content: mdxSource, frontmatter, error, headings }
  } catch (error) {
    console.error('Unexpected error fetching MDX content:', error)
    return {
      content: '',
      frontmatter: {},
      error: {},
      headings: []
    }
  }
}
