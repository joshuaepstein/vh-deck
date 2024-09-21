// import DeckIconDisplay from '@/components/deck-icon-display'
import DeckRenderer from '@/components/deck-renderer'
// import ItemDisplay from '@/components/item-display'
import SelectDeck from '@/components/SelectDeck'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import decksConfig from '@/config/decks.json'
import { getDecks, getTexture, isDeck } from '@/types/deck'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import treasureDeck from '~/deck/treasure.png'
import { RedirectWithCards } from './redirectWithCards'

export default async function HomePage({ searchParams: { selectedDeck, cards } }) {
    const decks = getDecks()
    if (!selectedDeck && !cards) {
        // we want to redirect to the starter deck
        redirect('/?selectedDeck=starter')
    } else if (!selectedDeck && cards) {
        // TODO: We need to redirect the user but make sure that we keep the cards.
        return <RedirectWithCards />
    }
    const selectedDeckType = selectedDeck && isDeck(selectedDeck) ? decks[selectedDeck] : null

    if (!selectedDeckType) notFound()

    return (
        <>
            <MaxWidthWrapper className="mt-16">
                <div className="flex flex-row items-center justify-between">
                    <SelectDeck selectedDeck={selectedDeck} selectedDeckType={selectedDeckType} />
                    <p className="text-2xl font-bold text-[#ffa800]">{selectedDeckType.name}</p>
                </div>

                <DeckRenderer deck={selectedDeckType} />
            </MaxWidthWrapper>
        </>
    )
}
