import * as React from 'react'

type InputProps = React.ComponentProps<'input'> & {
  disabledOutlined?: boolean
}

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabledOutlined = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground ${!disabledOutlined ? 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring' : ''} disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          className
        )}
        type={type}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
