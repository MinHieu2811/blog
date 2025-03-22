import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Drawer, DrawerContent, DrawerTitle } from '../ui/drawer'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import useDebounce from '@/hooks/useDebounce'
import axios from 'axios'
import { handleSearchBlog } from '@/services/searchBlog'
import { Skeleton } from '../ui/skeleton'
import { Post } from '@prisma/client'
import Link from 'next/link'

let cancelTokenSource = axios.CancelToken.source()

const SeachDrawer = () => {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 500)
  const [result, setResult] = useState<Array<Pick<Post, 'content' | 'id' | 'description' | 'title' | 'slug'>>>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = useCallback(async (keyword: string) => {
    if(!keyword?.length) return
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
    if(!keyword) setResult([])
  }, [keyword])

  return (
    <Drawer direction="bottom" open={open} onClose={() => setOpen(false)}>
      <Button
        variant="secondary"
        className="w-[35px] h-[35px] flex justify-center items-center"
        onClick={() => setOpen(true)}
      >
        <Search className="w-5 h-5 text-slate-800" />
      </Button>
      <DrawerContent className="h-2/3 bg-slate-800 border-none">
        <div className="w-2/3 mx-auto mt-4">
          <DrawerTitle className="text-3xl">Looking for something?</DrawerTitle>
          <Input
            className="w-full p-3 md:text-xl mt-4 h-14"
            ref={inputRef}
            placeholder={`Let's me know your keyword`}
            value={keyword}
            onChange={(e) => setKeyword(e?.target?.value)}
          ></Input>

          <div className="mt-5">
            {loading && <LoadingSearch />}
            {!loading && !!keyword?.length && result?.length === 0 && <>There is no posts</>}
            {!loading &&
              result?.map((item) => (
                <div key={item?.id} className="p-4 border-b border-slate-700">
                  <Link className="text-xl font-semibold" href={`/blogs/${item?.slug}`}>{item?.title ?? ''}</Link>
                  <div className="text-sm text-muted-foreground">
                    <HighlightText keyword={keyword} text={item?.content} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

const HighlightText = ({ text, keyword, contextLength = 140 }: {text: string, keyword: string, contextLength?: number }) => {
  if (!keyword.trim()) return <span>{text}</span>;

  const escapedKeyword = keyword?.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

  const regex = new RegExp(`(${escapedKeyword})`, "gi");
  const match = text?.match(regex);
  if (!match) return <span>{text}</span>;

  const firstMatchIndex = text?.toLowerCase()?.indexOf(match[0]?.toLowerCase());
  const start = Math.max(0, firstMatchIndex - contextLength);
  const end = Math.min(text?.length, firstMatchIndex + keyword?.length + contextLength);

  const trimmedText = `${start > 0 ? "..." : ""}${text?.substring(start, end)}${end < text?.length ? "..." : ""}`;

  const parts = trimmedText?.split(regex);

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
  );
};

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
