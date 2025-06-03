import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-react'
import React from 'react'

export type BlockInfoProps = {
  variant: 'info' | 'success' | 'warning' | 'error'
  className?: string
  children: React.ReactNode
}

const hardCodeForVariant = {
  info: {
    colorIcon: 'blue',
    colorBackgroundWrapper: 'border-blue-300 bg-blue-950',
    color: 'border-[#0d0f12] bg-[#0d0f12]',
    icon: <Info color="blue" size={30} />
  },
  success: {
    colorIcon: 'green',
    colorBackgroundWrapper: 'border-green-300 bg-green-950',
    color: 'border-[#0d0f12] bg-[#0d0f12]',
    icon: <CircleCheck color="green" size={30} />
  },
  warning: {
    colorIcon: 'yellow',
    colorBackgroundWrapper: 'border-yellow-300 bg-yellow-950',
    color: 'border-[#0d0f12] bg-[#0d0f12]',
    icon: <CircleAlert color="yellow" size={30} />
  },
  error: {
    colorIcon: 'red',
    colorBackgroundWrapper: 'border-red-300 bg-red-950',
    color: 'border-[#0d0f12] bg-[#0d0f12]',
    icon: <CircleX color="red" size={30} />
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
