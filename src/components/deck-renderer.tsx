'use client'

import { Deck, getDecks } from '@/types/deck'
import Image from 'next/image'

export default function DeckRenderer({ deck }: { deck: Deck }) {
    return (
        <>
            <h2 className="mt-6 text-xl font-semibold text-white">Your Deck</h2>
            {/* We want to create a grid, which displays the card layout - it should just render a red square if there is a box for a card, or a blue square if there cant be a card.
                The deck stores this inside of the deck.layout[0].value array, where 0 is a card and X is empty space. layout.values is a 2d array of rows and columns */}
            <div className="mt-6 flex w-max flex-col bg-[#D6BE96]">
                {deck.layout[0].value.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className="flex flex-row">
                            {row.split('').map(
                                (column, columnIndex) =>
                                    // <div
                                    //     key={columnIndex}
                                    //     className={`h-8 w-8 ${
                                    //         column === 'X' ? 'bg-red-500' : 'bg-blue-500'
                                    //     }`}
                                    // ></div>
                                    (column === 'O' && (
                                        <Image
                                            src="/inset_card_slot_background.png"
                                            width={64}
                                            height={64}
                                            alt="Card Slot"
                                        />
                                    )) || <div className="h-16 w-16"></div>
                            )}
                        </div>
                    )
                })}
            </div>
        </>
    )
}
