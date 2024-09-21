'use client'

import DeckIconDisplay from '@/components/deck-icon-display'
import ItemDisplay from '@/components/item-display'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Deck, Decks, getDecks, getTexture, isDeck } from '@/types/deck'
import Image from 'next/image'
import React from 'react'

export default function SelectDeck({
    selectedDeck,
    selectedDeckType,
}: {
    selectedDeck: keyof Decks
    selectedDeckType: Deck
}) {
    const decks = getDecks()
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <ItemDisplay>
                    <Image
                        src={getTexture(selectedDeck)}
                        alt={selectedDeckType.name}
                        width={1000}
                        height={1000}
                        className="pointer-events-none size-[50px] select-none"
                        style={{
                            imageRendering: 'pixelated',
                        }}
                    />
                </ItemDisplay>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <p className="text-2xl font-bold text-[#ffa800]">Select your deck</p>
                </DialogHeader>
                <div
                    className="mt-4 grid gap-4"
                    style={{
                        // based on the number of decks we need to work out how many columns we want so that there are no extra ones at the end (e.g. 2 in a row for 3 decks)
                        // gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                        gridTemplateColumns: `repeat(auto-fill, minmax(100px, ${Math.min(
                            100 / Object.keys(decks).length,
                            100
                        )}%)`,
                    }}
                >
                    {Object.entries(decks).map(([key, deck]) => (
                        <DeckIconDisplay
                            onSave={() => setOpen(false)}
                            key={key}
                            deck={deck}
                            deckKey={key}
                        />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
