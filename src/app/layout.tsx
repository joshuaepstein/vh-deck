import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/cn'
import { fontMono, fontSans } from '@/lib/fonts'
import { constructMetadata } from '@/lib/utils'
import '@/styles/globals.css'
import Providers from './providers'

export const metadata = constructMetadata({})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={cn('relative bg-background', fontSans.variable, fontMono.variable)}>
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    )
}
