import React, { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

const AnimatedPath = animated('path')

interface ExternalLinkProps {
  size?: number
  fill?: string
  className?: string
  isHovered?: boolean
  hoverFill?: string
}

const ExternalLink = ({
  size = 24,
  fill = 'none',
  className = '',
  isHovered: externalHover,
  hoverFill = 'currentColor'
}: ExternalLinkProps) => {
  const [internalHover, setInternalHover] = useState(false)
  const isHovered = externalHover ?? internalHover

  const { pointPath, middleLinePath } = useSpring({
    pointPath: isHovered ? 'M17 1H23V7' : 'M15 3H21V9',
    middleLinePath: isHovered ? 'M10 14L23 1' : 'M10 14L21 3',
    config: { tension: 300, friction: 20 }
  })

  return (
    <svg
      className={`lucide lucide-external-link-icon lucide-external-link ${className}`}
      fill={fill}
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => !externalHover && setInternalHover(true)}
      onMouseLeave={() => !externalHover && setInternalHover(false)}
    >
      <AnimatedPath
        d={pointPath}
        stroke={isHovered ? hoverFill : 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <AnimatedPath
        d={middleLinePath}
        stroke={isHovered ? hoverFill : 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export default ExternalLink
