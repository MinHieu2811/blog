export const estimatedReadingTime = (text: string) => {
  const averageWPM = 250

  const cleanedText = text?.trim()?.replace(/\s+/g, ' ')

  const words = cleanedText?.split(' ')
  const wordCount = words?.length ?? 0

  const readingTime = wordCount / averageWPM

  const formattedTime =
    readingTime >= 1 ? Math.ceil(readingTime) + ` ${readingTime >= 2 ? 'mins' : 'min'}` : 'Less than 1 min'

  return formattedTime
}
