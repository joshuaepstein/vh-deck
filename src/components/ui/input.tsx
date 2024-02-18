import * as React from 'react'

import { cn } from '@/lib/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    noDefaultClassNames?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, noDefaultClassNames = false, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    {
                        'flex h-9 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300':
                            !noDefaultClassNames,
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
