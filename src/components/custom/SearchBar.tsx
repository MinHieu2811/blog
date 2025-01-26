import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if(isExpanded) {
      inputRef?.current?.focus()
    } else if(inputRef?.current) {
      inputRef.current.value = ''
    } else {
      return
    }
  }, [isExpanded])

  return (
    <div className="relative flex items-center">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isExpanded ? '300px' : '36px', opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center overflow-hidden bg-gray-200 rounded-full shadow-md"
      >
        <Input
          type="text"
          value={keyword}
          ref={inputRef}
          placeholder="Search..."
          className={`bg-transparent search-bar-input text-black focus-visible:border-0 focus-visible:outline-0 outline-0 border-0 ${isExpanded ? 'flex-1 px-4 py-2' : 'w-0 p-0 border-0'}`}
          onBlur={() => setIsExpanded(false)}
          onChange={(e) => setKeyword(e?.target?.value)}
        />
        {isExpanded ? (
          <motion.button
            onClick={() => setIsExpanded(false)}
            className="p-2 text-gray-600 hover:text-gray-800"
            whileHover={{ scale: 1.1 }}
          >
            ✖️
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setIsExpanded(true)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            exit={{ transform: 'rotate(180deg)'}}
            className="p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}

export default SearchBar
