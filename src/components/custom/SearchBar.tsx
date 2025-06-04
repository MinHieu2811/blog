import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, XIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isExpanded) {
      inputRef?.current?.focus()
    } else if (inputRef?.current) {
      inputRef.current.value = ''
    } else {
      return
    }
  }, [isExpanded])

  return (
    <div className="relative flex items-center justify-end">
      <motion.div
        animate={{ width: isExpanded ? '300px' : '36px', opacity: 1 }}
        className="flex items-center overflow-hidden bg-gray-200 rounded-sm shadow-md"
        exit={{ width: 0, opacity: 0 }}
        initial={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Input
          ref={inputRef}
          disabledOutlined
          className={`bg-gray-200 search-bar-input text-black focus-visible:border-0 focus-visible:outline-0 outline-0 border-0 ${isExpanded ? 'flex-1 h-full px-4 py-3' : 'w-0 p-0 border-0'}`}
          placeholder="Search..."
          type="text"
          value={keyword}
          onBlur={() => setIsExpanded(false)}
          onChange={(e) => setKeyword(e?.target?.value)}
        />
        {isExpanded ? (
          <motion.button
            className="p-2 text-gray-600 absolute right-0 hover:text-gray-800"
            whileHover={{ scale: 1.1 }}
            onClick={() => setKeyword('')}
          >
            <XIcon className="text-red-700" />
          </motion.button>
        ) : (
          <motion.button
            className="p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none"
            exit={{ transform: 'rotate(180deg)' }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
          >
            <Search className="w-5 h-5 text-gray-600" />
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}

export default SearchBar
