export const findSuitableTextColor = (hex: string): string => {
    const rgb = hexToRgb(hex)
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
    return brightness > 125 ? '#000' : '#fff'
}

function hexToRgb(hex: string) {
    const bigint = parseInt(hex.replace('#', ''), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return { r, g, b }
}

function randomHex() {
    return Math.floor(Math.random() * 16777215).toString(16)
}

function convertHexToHSL(hex: string) {
    let r = 0,
        g = 0,
        b = 0

    // 3 digits
    if (hex.length == 3) {
        r = parseInt(hex.charAt(0) + hex.charAt(0), 16)
        g = parseInt(hex.charAt(1) + hex.charAt(1), 16)
        b = parseInt(hex.charAt(2) + hex.charAt(2), 16)

        // 6 digits
    } else if (hex.length == 6) {
        r = parseInt(hex.substr(0, 2), 16)
        g = parseInt(hex.substr(2, 2), 16)
        b = parseInt(hex.substr(4, 2), 16)
    }

    ;(r /= 255), (g /= 255), (b /= 255)
    let max = Math.max(r, g, b),
        min = Math.min(r, g, b)
    let h = 0,
        s = 0,
        l = (max + min) / 2

    if (max == min) {
        h = s = 0 // achromatic
    } else {
        let d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    h = Math.round(h * 360)
    s = Math.round(s * 100)
    l = Math.round(l * 100)

    return `hsl(${h}, ${s}%, ${l}%)`
}

function convertHexToRGB(hex: string) {
    let r = 0,
        g = 0,
        b = 0

    // 3 digits
    if (hex.length == 3) {
        r = parseInt(hex.charAt(0) + hex.charAt(0), 16)
        g = parseInt(hex.charAt(1) + hex.charAt(1), 16)
        b = parseInt(hex.charAt(2) + hex.charAt(2), 16)

        // 6 digits
    } else if (hex.length == 6) {
        r = parseInt(hex.substr(0, 2), 16)
        g = parseInt(hex.substr(2, 2), 16)
        b = parseInt(hex.substr(4, 2), 16)
    }

    return `${r},${g},${b}`
}

export enum Colours {
    RED = '\x1b[31m',
    GREEN = '\x1b[32m',
    BLUE = '\x1b[34m',
    CYAN = '\x1b[36m',
    YELLOW = '\x1b[33m',
    ORANGE = '\x1b[38;5;202m',
    PINK = '\x1b[38;5;206m',
    RESET = '\x1b[0m', // Reset color to default
}

export function coloured(colour: Colours, ...args: unknown[]) {
    const resetCode = Colours.RESET

    // console.log(colorCode, ...args, resetCode);
    return `${colour.toString()}${args.join(' ')}${resetCode}`
}
