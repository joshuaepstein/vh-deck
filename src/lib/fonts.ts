import { Inter, JetBrains_Mono, Rajdhani } from 'next/font/google'

export const fontSans = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const fontMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
})

export const rajdhaniFont = Rajdhani({
    subsets: ['latin'],
    variable: '--font-rajdhani',
    weight: ['300', '400', '500', '600', '700'],
})
