import React, { useState } from 'react'

const CountExample = ({ initialCount = 0 }: { initialCount?: number }) => {
  const [count, setCount] = useState(initialCount)

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-gray-200 p-4 rounded-md">
      <p className="text-2xl font-bold">{count}</p>
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setCount(count - 1)}>
          Decrement
        </button>
      </div>
    </div>
  )
}

export default CountExample
