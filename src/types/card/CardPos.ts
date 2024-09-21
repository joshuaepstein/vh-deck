interface JsonElement {}
interface JsonArray extends Array<any> {}
interface JsonObject {
    [key: string]: any
}

class CardPos {
    public x: number
    public y: number

    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    public add(x: number, y: number): CardPos {
        return new CardPos(this.x + x, this.y + y)
    }

    public equals(other: any): boolean {
        if (this === other) {
            return true
        } else if (other && this.constructor === other.constructor) {
            const pos = other as CardPos
            return this.x === pos.x && this.y === pos.y
        } else {
            return false
        }
    }

    public hashCode(): number {
        return this.x * 31 + this.y
    }

    public readJson(json: JsonElement): void {
        if (Array.isArray(json)) {
            const array = json as JsonArray
            this.x = array[0] ?? 0
            this.y = array[1] ?? 0
        } else if (typeof json === 'object') {
            const object = json as JsonObject
            this.x = object['x'] ?? 0
            this.y = object['y'] ?? 0
        } else {
            throw new Error('Unsupported JSON format')
        }
    }
}
