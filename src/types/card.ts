export enum CardType {
    'Arcane',
    'Temporal',
    'Resource',
    'Evolution',
    'Stat',
    'Wild',
}

export const CardTypes = ['Arcane', 'Temporal', 'Resource', 'Evolution', 'Stat', 'Wild']

export enum CardColor {
    GREEN = 5635925,
    BLUE = 5636095,
    YELLOW = 16777045,
    RED = 16733525,
}

export interface Card {
    tier: number
    entries: Entry[]
}

export interface Entry {
    name: Name
    groups: string[]
    model: string
    colors: CardColor[]
    modifier: Modifier
}

export interface Name {
    text: string
}

export interface Modifier {
    type: string
    config: {
        pool: {
            tier: number
            config: {
                min: number
                max: number
                step: number
            }
        }[]
        attribute: string
        maxTier: number
    }
    values: {
        tier: number
        value: number
    }[]
}
