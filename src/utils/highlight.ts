import { getHighlighter } from 'shiki'

export async function highlightCode(code: string, lang: string = 'javascript') {
  try {
    const highlighter = await getHighlighter({ themes: ['github-dark'], langs: [lang] })

    return highlighter.codeToHtml(code, {
      mergeWhitespaces: false,
      lang,
      theme: 'github-dark',
      tabindex: 2
    })
  } catch (error) {
    console.error('Shiki highlighting error:', error)

    return `<pre><code>${code}</code></pre>` // Fallback
  }
}
