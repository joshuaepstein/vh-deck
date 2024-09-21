'use client'

import card from '@/config/example_card'
import { Card, CardColor, CardTypes } from '@/types/card'
import { CardPos } from '@/types/card/CardPos'
import { Deck, getDecks } from '@/types/deck'
import Image from 'next/image'
import React from 'react'
import CardItemDisplay from './card-item-display'

export default function DeckRenderer({ deck }: { deck: Deck }) {
    // create with predefined CardPos: 1, 1 and card `card`
    const [deckCards, setDeckCards] = React.useState<Map<CardPos, Card>>(
        new Map([[new CardPos(1, 1), card]])
    )

    const hasCard = (pos: CardPos) => {
        var found = false
        deckCards.forEach((card, cardPos) => {
            if (cardPos.x === pos.x && cardPos.y === pos.y) {
                found = true
            }
        })
        return found
    }

    const getCard = (pos: CardPos) => {
        let card: Card | undefined
        deckCards.forEach((cardInDeck, cardPos) => {
            if (cardPos.x === pos.x && cardPos.y === pos.y) {
                card = cardInDeck
            }
        })
        return card
    }

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
                                    (column === 'O' && (
                                        <div
                                            key={columnIndex.toString() + rowIndex.toString()}
                                            className="flex size-16 items-center justify-center"
                                            style={{
                                                backgroundImage:
                                                    'url(/inset_card_slot_background.png)',
                                                backgroundSize: 'cover',
                                            }}
                                        >
                                            {hasCard(new CardPos(columnIndex, rowIndex)) && (
                                                <CardItemDisplay
                                                    card={getCard(
                                                        new CardPos(columnIndex, rowIndex)
                                                    )}
                                                />
                                            )}
                                        </div>
                                    )) || (
                                        <div
                                            key={columnIndex.toString() + rowIndex.toString()}
                                            className="h-16 w-16"
                                        />
                                    )
                            )}
                        </div>
                    )
                })}
            </div>
        </>
    )
}
