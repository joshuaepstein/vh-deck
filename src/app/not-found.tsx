import Logo from '@/components/shared/brand/Logo'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFoundPage() {
    return (
        <MaxWidthWrapper className="items-center justify-between">
            <Logo className="h-8" />
            <div className="flex flex-col items-center">
                <h1 className="mt-5 text-5xl font-medium text-primary-700">404</h1>
                <p className="mt-2 text-primary-950/50">
                    The page you were looking for could not be found.
                </p>
                <Button variant="primary" className="mt-8" asChild>
                    <Link href="/">Return home</Link>
                </Button>
            </div>
            <div />
        </MaxWidthWrapper>
    )
}
