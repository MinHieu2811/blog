import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Frown, Search } from 'lucide-react'
import { Input } from '../ui/input'
import useDebounce from '@/hooks/useDebounce'
import axios from 'axios'
import { handleSearchBlog } from '@/services/searchBlog'
import { Skeleton } from '../ui/skeleton'
import { Post } from '@prisma/client'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { ScrollArea } from '../ui/scroll-area'

let cancelTokenSource = axios.CancelToken.source()

const SeachDrawer = () => {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 500)
  const [result, setResult] = useState<Array<Pick<Post, 'content' | 'id' | 'description' | 'title' | 'slug'>>>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = useCallback(async (keyword: string) => {
    if (!keyword?.length) return
    let isFinished = false
    try {
      setLoading(true)
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Cancel the previous request')
        isFinished = false
      }
      cancelTokenSource = axios.CancelToken.source()

      const response = await handleSearchBlog(keyword, cancelTokenSource)
      setResult(response)

      isFinished = true
    } catch (error) {
      console.error(error)
    } finally {
      if (isFinished) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
    }
  }, [open])

  useEffect(() => {
    if (debouncedKeyword) {
      handleSearch(debouncedKeyword)
    }
  }, [debouncedKeyword, handleSearch])

  useEffect(() => {
    if (!keyword) setResult([])
  }, [keyword])

  const onClearSearch = (isOpen: boolean) => {
    if (!isOpen) {
      setKeyword('')
    }
  }

  return (
    <Sheet onOpenChange={onClearSearch}>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="w-[35px] h-[35px] flex justify-center items-center"
          onClick={() => setOpen(true)}
        >
          <Search className="w-5 h-5 text-slate-800" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-2/3 bg-slate-800 border-none font-sans">
        <div className="relative h-full">
          <div className="w-2/3 mx-auto mt-4 ">
            <SheetTitle className="text-3xl">Looking for something?</SheetTitle>
            <Input
              className="w-full p-3 md:text-xl mt-4 h-14"
              ref={inputRef}
              placeholder={`Let's me know your keyword`}
              value={keyword}
              onChange={(e) => setKeyword(e?.target?.value)}
            ></Input>

            <div className="mt-3 z-10">
              {loading && <LoadingSearch />}
              {!loading && !!keyword?.length && result?.length === 0 && <NotFound />}
              {!loading && (
                <ScrollArea className="h-[450px] z-10">
                  {result?.map((item, index) => (
                    <div
                      key={item?.id}
                      className={`${index !== result?.length - 1 ? 'border-b border-slate-700' : ''} p-2`}
                    >
                      <Link className="text-xl font-semibold" href={`/blogs/${item?.slug}`}>
                        {item?.title ?? ''}
                      </Link>
                      <div className="text-sm text-muted-foreground">
                        <HighlightText keyword={keyword} text={item?.content} />
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </div>
          </div>
          <div className="rotate-180 absolute bottom-[-300px] left-[-24px] z-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5120"
              height="456"
              fill="none"
              viewBox="0 0 5120 456"
              preserveAspectRatio="none"
              className="upper-sky-svg"
            >
              <path
                fill="rgb(30 41 59 / 1)"
                d="M2641.4 401.5C2613.31 399.999 2525.75 198 2121.01 198C1862 198 1840 264.5 1806.88 259.5C1773.77 254.499 1723.34 129.991 1562.17 136C1401 142.009 1366.58 313.5 1339 321C1311.42 328.5 1279 226.5 1034.79 234.5C802.99 242.093 724.297 318.5 697 313C669.703 307.5 681 75.9996 430.496 32.4996C214.304 -5.042 99.7464 183.937 60.6394 266.475C51.4353 285.9 27.9703 295.392 8.5729 286.129C-15.3473 274.705 -43 292.144 -43 318.652V429.5C-43 443.859 -31.3592 455.5 -16.9999 455.5H5103C5127.3 455.5 5147 435.8 5147 411.5V232.89C5147 226.643 5146.46 220.404 5144.55 214.457C5136.92 190.729 5108.7 128.5 5022.5 128.5C4881 128.5 4935 253.704 4838.83 249C4808.16 247.499 4757.27 55.5004 4535 59C4312.73 62.4996 4283.98 270.5 4250.5 268.5C4217.02 266.5 4197 199 4037.27 189.5C3834.76 177.455 3790.86 285 3753.5 279C3716.14 273 3652.96 98.8238 3377.5 153.5C3156.46 197.374 3191.5 387.48 3139.82 376.5C3118.64 371.999 3078.5 339 2948.03 339C2894.2 339 2890.37 330.676 2837.19 339C2708.5 359.141 2669.5 403 2641.4 401.5Z"
              ></path>
            </svg>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

const NotFound = () => {
  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <div className="icon">
        <Frown size={50} />
      </div>
      <div className="text-lg mt-4">Sorry, I can&apos;t find your post!</div>
    </div>
  )
}

const HighlightText = ({
  text,
  keyword,
  contextLength = 140
}: {
  text: string
  keyword: string
  contextLength?: number
}) => {
  if (!keyword.trim()) return <span>{text}</span>

  const escapedKeyword = keyword?.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

  const regex = new RegExp(`(${escapedKeyword})`, 'gi')
  const match = text?.match(regex)
  if (!match) return <span>{text}</span>

  const firstMatchIndex = text?.toLowerCase()?.indexOf(match[0]?.toLowerCase())
  const start = Math.max(0, firstMatchIndex - contextLength)
  const end = Math.min(text?.length, firstMatchIndex + keyword?.length + contextLength)

  const trimmedText = `${start > 0 ? '...' : ''}${text?.substring(start, end)}${end < text?.length ? '...' : ''}`

  const parts = trimmedText?.split(regex)

  return (
    <span>
      {parts?.map((part, index) =>
        part?.toLowerCase() === keyword?.toLowerCase() ? (
          <mark key={index} className="bg-yellow-300 font-bold px-1 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  )
}

const LoadingSearch = () => {
  return (
    <>
      <div className="mt-4">
        <Skeleton className="h-4 w-full mb-2 bg-primary/50" />
        <Skeleton className="h-4 w-2/3 mt-2 bg-primary/50" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-4 w-full mb-2 bg-primary/50" />
        <Skeleton className="h-4 w-2/3 mt-2 bg-primary/50" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-4 w-full mb-2 bg-primary/50" />
        <Skeleton className="h-4 w-2/3 mt-2 bg-primary/50" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-4 w-full mb-2 bg-primary/50" />
        <Skeleton className="h-4 w-2/3 mt-2 bg-primary/50" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-4 w-full mb-2 bg-primary/50" />
        <Skeleton className="h-4 w-2/3 mt-2 bg-primary/50" />
      </div>
    </>
  )
}

export default SeachDrawer
