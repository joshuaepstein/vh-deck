import { cn } from '@/lib/cn'
import { ReactNode } from 'react'

export default function MaxWidthWrapper({
    className,
    children,
    id,
}: {
    className?: string
    children: ReactNode
    id?: string
}) {
    return (
        <div
            className={cn(`mx-auto w-full max-w-screen-xl px-2.5 md:px-20`, className)}
            {...(id ? { id } : {})}
        >
            {children}
        </div>
    )
}
