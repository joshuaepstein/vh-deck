import { cn } from '@/lib/cn'
import Image from 'next/image'
import React from 'react'

export default function ItemDisplay({
    children,
    className,
    ...props
}: React.HTMLProps<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'bg-iconframe flex size-[75px] items-center justify-center bg-cover bg-center',
                className
            )}
            style={{
                imageRendering: 'pixelated',
            }}
            {...props}
        >
            {children}
        </div>
    )
}
