export enum CardType {
    'Arcane',
    'Temporal',
    'Resource',
    'Evolution',
    'Stat',
    'Wild',
}

export enum CardColor {
    GREEN = 5635925,
    BLUE = 5636095,
    YELLOW = 16777045,
    RED = 16733525,
}

export interface Card {
    tier: number
    entries: ICardEntry[]
}

export interface ICardEntry {
    name: string
    colors: CardColor[]
    groups: string[]
    modifiers: JsonElement
    scaler: JsonElement
    condition: JsonElement
}
