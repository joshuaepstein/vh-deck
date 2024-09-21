'use client'

import { useMouse } from '@/lib/hooks/useMouse'
import { Deck, getDecks, getTexture } from '@/types/deck'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ItemDisplay from './item-display'

export default function DeckIconDisplay({
    deck,
    deckKey,
    onSave,
}: {
    deck: Deck
    deckKey: keyof ReturnType<typeof getDecks>
    onSave: () => void
}) {
    const { x, y, ref } = useMouse()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    return (
        <TooltipPrimitive.Tooltip delayDuration={0} defaultOpen={false} disableHoverableContent>
            <TooltipPrimitive.TooltipTrigger ref={ref} className="w-max">
                <ItemDisplay
                    className="size-[50px]"
                    onClick={() => {
                        const editableSearchParams = new URLSearchParams(searchParams)
                        editableSearchParams.set('selectedDeck', deckKey)
                        const updatedPath = `${pathname}?${editableSearchParams.toString()}`
                        router.push(updatedPath)
                        onSave()
                    }}
                >
                    <Image
                        src={getTexture(deckKey)}
                        alt={deck.name}
                        width={1000}
                        height={1000}
                        className="pointer-events-none size-[33.33px] select-none"
                        style={{
                            imageRendering: 'pixelated',
                        }}
                    />
                </ItemDisplay>
            </TooltipPrimitive.TooltipTrigger>
            <TooltipPrimitive.TooltipContent
                align="start"
                alignOffset={x}
                sideOffset={-y + 10}
                hideWhenDetached
                className="rounded-[0] border-[2px] border-[#ffa800] bg-[#050e1bcc] p-[5px] font-semibold text-white backdrop-blur-[10px]"
            >
                {deck.name}
            </TooltipPrimitive.TooltipContent>
        </TooltipPrimitive.Tooltip>
    )
}
