'use client'

import Logo from '@/components/shared/brand/Logo'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <>
            <MaxWidthWrapper className="flex h-dvh items-center justify-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-primary-700 mt-5 text-5xl font-medium">
                        Something went wrong!
                    </h1>
                    <p className="text-primary-950/50 mt-2">{error.message}</p>
                    <Button variant="primary" className="mt-8" onClick={() => reset()}>
                        Try again
                    </Button>
                </div>
            </MaxWidthWrapper>
        </>
    )
}
