import { cn } from '@/lib/cn'
import { ReactNode } from 'react'

export default function MaxWidthWrapper({
    className,
    children,
    id,
    quizzonColumn = false,
}: {
    className?: string
    children: ReactNode
    id?: string
    quizzonColumn?: boolean
}) {
    return (
        <div
            className={cn(
                `mx-auto w-full max-w-screen-xl px-2.5 md:px-20`,
                {
                    'flex min-h-screen flex-col items-start justify-start border-t-2 border-t-primary bg-[#F6F8F2] py-8':
                        quizzonColumn,
                },
                className
            )}
            {...(id ? { id } : {})}
        >
            {children}
        </div>
    )
}
