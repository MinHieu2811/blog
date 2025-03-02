import { CircleAlert, CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react'
import React from 'react'

export type BlockInfoProps = {
  variant: 'info' | 'success' | 'warning' | 'error'
  className?: string
  children: React.ReactNode
}

const hardCodeForVariant = {
  info: {
    colorIcon: 'var(--wh-blue-900)',
    colorBackgroundWrapper: 'border-blue-300 bg-blue-950',
    color: 'border-black bg-blue-300',
    icon: <Info color='var(--wh-blue-900)' size={30}/>
  },
  success: {
    colorIcon: 'var(--wh-green-900)',
    colorBackgroundWrapper: 'border-green-300 bg-green-950',
    color: 'border-black bg-green-300',
    icon: <CircleCheck color='var(--wh-green-900)' size={30}/>
  },
  warning: {
    colorIcon: 'var(--wh-yellow-900)',
    colorBackgroundWrapper: 'border-yellow-300 bg-yellow-950',
    color: 'border-black bg-yellow-300',
    icon: <CircleAlert color='var(--wh-yellow-900)' size={30}/>
  },
  error: {
    colorIcon: 'var(--wh-red-900)',
    colorBackgroundWrapper: 'border-red-300 bg-red-950',
    color: 'border-black bg-red-300',
    icon: <CircleX color='var(--wh-red-900)' size={30}/>
  }
}

const BlockInfo = ({ variant, className = '', children }: BlockInfoProps) => {
  return (
    <div
      className={`${className} ${variant} relative border-l-4 px-3 py-3 my-5 rounded-sm ${hardCodeForVariant[variant]?.colorBackgroundWrapper}`}
    >
      <div
        className={`icon absolute p-1 border-x-4 top-[-23px] left-[-23px] border-y-4  rounded-full ${hardCodeForVariant[variant]?.color}
      `}
      >
        {hardCodeForVariant[variant]?.icon}
      </div>
      {children}
    </div>
  )
}

export default BlockInfo
