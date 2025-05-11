import React from 'react'
import { useSpring } from '@react-spring/web'
import { IconSize } from '@/types/icon'

const SPRING_CONFIG = {
  friction: 120,
  tension: 120,
}

interface ArrowRightProps {
  isHovered?: boolean
  size?: IconSize
}

const ArrowRight = ({ isHovered = false, size = 16 }: ArrowRightProps) => {
  const springProps = useSpring({
    from: { x: 0 },
    to: { x: isHovered ? 2 : 0 },
    config: SPRING_CONFIG,
    loop: isHovered,
    reset: false
  })

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-arrow-right-icon lucide-arrow-right w-[${size}px] h-[${size}px]`}
    >
      <path
        d={isHovered ? 'M5 12h17' : 'M5 12h14'}
        style={{
          transition: 'd 0.3s ease-in-out'
        }}
      />
      <g style={{ transform: `translateX(${springProps.x.get()}px)`, transition: 'd 0.3s ease-in-out' }}>
        <path
          d={isHovered ? 'm15 5 7 7-7 7' : 'm12 5 7 7-7 7'}
          style={{
            transition: 'd 0.3s ease-in-out'
          }}
        />
      </g>
    </svg>
  )
}

export default ArrowRight
