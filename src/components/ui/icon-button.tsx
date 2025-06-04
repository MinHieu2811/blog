import React from 'react'

import { Button, ButtonProps } from './button'

import { cn } from '@/lib/utils'
import { IconSize } from '@/types/icon'

interface IconProps {
  isHovered?: boolean
  size?: IconSize
}

interface IconButtonProps extends ButtonProps {
  icon: React.ReactElement<IconProps>
  className?: string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, icon, variant = 'default', className, onMouseEnter, onMouseLeave, onClick, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(true)
      onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false)
      onMouseLeave?.(e)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
    }

    const iconWithProps = React.cloneElement(icon, { isHovered })

    return (
      <Button
        ref={ref}
        className={cn('inline-flex items-center gap-2', className)}
        variant={variant}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
        {iconWithProps}
      </Button>
    )
  }
)

IconButton.displayName = 'IconButton'

export { IconButton }
