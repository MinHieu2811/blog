import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

import { supabase } from '@/lib/supabase'
import { extractHeadings } from '@/utils/extractHeadings'

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

    if (error) {
      console.error('Error fetching MDX file:', JSON.stringify(error))

      return {
        content: '',
        frontmatter: {},
        error: {},
        headings: []
      }
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
