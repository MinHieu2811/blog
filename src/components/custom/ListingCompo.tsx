import React from 'react'

type ListingCompoProps<T> = {
  list?: T[]
  messageEmpty?: string
  className?: string
  renderItem: (item: T) => React.ReactNode
}

const ListingCompo = <T,>({ list = [], messageEmpty, renderItem, className }: ListingCompoProps<T>) => {
  if (list?.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>{messageEmpty ?? ''}</p>
      </div>
    )
  }

  return <div className={className}>{list?.map((item) => renderItem(item))}</div>
}

export default ListingCompo
