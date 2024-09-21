export type Deck = {
    model: `the_vault:deck/${string}#inventory`
    name: string
    layout: {
        value: string[] // 0 is a card, X is empty space
        weight: number
    }[]
}

export type Decks = Record<string, Deck>

// get decks from "@/config/decks.json"
import decks from '@/config/decks.json'
import { Card } from './card'

export const getDecks = (): Decks => {
    return JSON.parse(JSON.stringify(decks))
}

export const getTexture = (deckKey: keyof Decks): string => {
    const deck: Deck = decks[deckKey]
    const model = deck.model
    // we want just the ${string} part
    const texture = model.split('#')[0].split('/')[1]
    return `/deck/${texture}.png`
}

export const isDeck = (deck: string): deck is keyof Decks => {
    return Object.keys(decks).includes(deck)
}

// const getLayout = (layout: Deck['layout']): string[] => {
//     if (!layout) {
//         return []
//     }
//     if (layout.length === 1) {
//         return layout[0].value
//     }
//     const totalWeight = layout.reduce((acc, curr) => acc + curr.weight, 0)
//     const random = Math.random() * totalWeight
//     let weight = 0
//     for (const item of layout) {
//         weight += item.weight
//         if (random < weight) {
//             return item.value
//         }
//     }
//     return layout[layout.length - 1].value
// }

// export const createLayout = (deckKey: keyof Decks): Map<CardPos, Card> => {
//     const deck = getDecks()[deckKey.toLowerCase()]
//     if (!deck) {
//         console.log('No deck found with the key: ', deckKey)
//         return new Map()
//     }
//     const selectedLayout: string[] = getLayout(deck.layout)
//     const layout = new Map<CardPos, Card>()
//     for (let row = 0; row < selectedLayout.length; row++) {
//         const line = selectedLayout[row]

//         for (let column = 0; column < line.length; column++) {
//             if (line[column] === '0') {
//                 layout.set(new CardPos(column, row), null)
//             }
//         }
//     }

//     return layout
// }
