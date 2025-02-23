import { useEffect, useState } from 'react'

export const useHeadings = () => {
  const [headings, setHeadings] = useState<{ id: string; title: string }[]>([])

  useEffect(() => {
    const headingElements = document.querySelectorAll('h2, h3')

    const headingData = Array.from(headingElements).map((heading, index) => {
      let id = heading.id

      if (!id) {
        id =
          heading.textContent
            ?.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '') || `heading-${index}`
        heading.id = id
      }

      return { id, title: heading?.textContent || `Heading ${index + 1}` }
    })

    setHeadings(headingData)
  }, [])

  return headings
}
