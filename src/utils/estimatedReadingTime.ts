export const estimatedReadingTime = (text: string) => {
  const averageWPM = 250

  const cleanedText = text?.trim()?.replace(/\s+/g, ' ')

  // Đếm số từ
  const words = cleanedText?.split(' ')
  const wordCount = words?.length ?? 0

  const readingTime = wordCount / averageWPM

  const formattedTime = readingTime >= 1 ? Math.ceil(readingTime) + ' min' : 'Less than 1 min'

  return formattedTime
}
