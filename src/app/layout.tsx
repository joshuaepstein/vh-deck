import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/cn'
import { fontMono, fontSans, rajdhaniFont } from '@/lib/fonts'
import { constructMetadata } from '@/lib/utils'
import '@/styles/globals.css'
import Providers from './providers'

export const metadata = constructMetadata({})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'bg-background relative',
                    fontSans.variable,
                    fontMono.variable,
                    rajdhaniFont.variable
                )}
                style={{
                    backgroundImage: 'url(/dark_bg.webp)',
                }}
            >
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    )
}
