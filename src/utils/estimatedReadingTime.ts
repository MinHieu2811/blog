export const estimatedReadingTime = (text: string) => {
  const averageWPM = 250

  // Loại bỏ khoảng trắng dư thừa
  const cleanedText = text?.trim()?.replace(/\s+/g, ' ')

  // Đếm số từ
  const words = cleanedText?.split(' ')
  const wordCount = words?.length ?? 0

  // Tính thời gian đọc (số từ chia cho số từ trung bình mỗi phút)
  const readingTime = wordCount / averageWPM

  // Làm tròn thời gian
  const formattedTime = readingTime >= 1 ? Math.ceil(readingTime) + ' min' : 'Less than 1 min'

  return formattedTime
}
