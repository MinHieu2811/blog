export const onCopy = (content: string, callback?: () => void) => {
  navigator.clipboard.writeText(content)

  callback?.()
}
