'use client'

import Logo from '@/components/shared/brand/Logo'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { Button } from '@/components/ui/button'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <>
            <MaxWidthWrapper className="items-center justify-between">
                <Logo className="h-8" />
                <div className="flex flex-col items-center">
                    <h1 className="mt-5 text-5xl font-medium text-primary-700">
                        Something went wrong!
                    </h1>
                    <p className="mt-2 text-primary-950/50">{error.message}</p>
                    <Button variant="primary" className="mt-8" onClick={() => reset()}>
                        Try again
                    </Button>
                </div>
                <div />
            </MaxWidthWrapper>
        </>
    )
}
