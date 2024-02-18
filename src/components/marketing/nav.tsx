'use client'

import { cn } from '@/lib/cn'
import { useScroll } from '@/lib/hooks'
import { fetcher } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'
import Logo from '../shared/brand/Logo'
import LoadingCircle from '../ui/icons/loading-circle'

const navigationLinks = [
    {
        label: 'Features',
        href: '/',
    },
    {
        label: 'Demo',
        href: '/demo',
    },
    {
        label: 'Pricing',
        href: '/pricing',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
]

export default function MarketingNavigation() {
    const pathname = usePathname()
    const { data: session, isLoading } = useSWR('/api/auth/session', fetcher, {
        dedupingInterval: 60000,
    })
    const isScrolled = useScroll(80)
    const isActive = (href: string) => pathname === href

    return (
        <>
            <nav
                className={cn(
                    'sticky inset-x-0 top-0 flex w-full items-center justify-between bg-transparent py-4 text-primary-900 transition-all',
                    {
                        'border-b border-primary-900/10 bg-background/75 px-4 backdrop-blur-lg dark:border-background/10 dark:bg-primary-900/75':
                            isScrolled,
                    }
                )}
            >
                <Logo className="h-6 scale-100 transition-transform hover:scale-105 active:scale-95" />
                <div className="hidden flex-row items-center space-x-8 md:flex">
                    <ul
                        className="group hidden flex-row items-center space-x-8 md:flex"
                        aria-label="desktop-navigation"
                    >
                        {navigationLinks.map((link, index) => {
                            const active = isActive(link.href)

                            return (
                                <li
                                    key={index}
                                    className={cn(
                                        `font-normal text-primary-900/80 transition hover:text-primary-700 hover:!opacity-100 group-hover:opacity-50`,
                                        {
                                            'font-medium text-primary-600': active,
                                        }
                                    )}
                                >
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="flex flex-row items-center space-x-2">
                        {session && Object.keys(session).length > 0 ? (
                            <Link
                                href="/dashboard"
                                className="animate-fade-in rounded-full border border-primary-950 bg-primary-950 px-4 py-1.5 text-sm text-background transition-all hover:bg-background hover:text-primary-950"
                            >
                                Dashboard
                            </Link>
                        ) : !isLoading ? (
                            <>
                                <Link
                                    href={`/login`}
                                    className="animate-fade-in rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={`/register`}
                                    className="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <div className="flex h-8 items-center justify-center">
                                <LoadingCircle />
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}
