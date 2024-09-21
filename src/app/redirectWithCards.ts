'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function RedirectWithCards() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const cards = searchParams.get('cards')
    const selectedDeck = searchParams.get('selectedDeck')

    if (!selectedDeck && cards) {
        const editableSearchParams = new URLSearchParams(searchParams)
        editableSearchParams.set('selectedDeck', 'starter')
        router.push(`${pathname}?${editableSearchParams.toString()}`)
        return null
    }

    return null
}
