import React from 'react'
import { cn } from '@/lib/utils'
import { Button, ButtonProps } from './button'
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
        variant={variant}
        className={cn('inline-flex items-center gap-2', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
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