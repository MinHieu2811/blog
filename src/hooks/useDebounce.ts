import { useEffect, useState } from 'react'

export default function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(id)
  }, [value, delay])

  return debounceValue
}
