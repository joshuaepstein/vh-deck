import ms from 'ms'
import { customAlphabet } from 'nanoid'
import { Metadata } from 'next/types'

export function constructMetadata({
    title = 'Report Generator',
    description = 'Generate rehearsal and show reports for your productions.',
    //   image = "https://localhost:3000/images/thumbnail.png",
    image = 'https://report-gen.jfstech.uk/thumbnail.png',
    icons = '/favicon.ico',
    noIndex = false,
}: {
    title?: string
    description?: string
    image?: string
    icons?: string
    noIndex?: boolean
}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        metadataBase: new URL('https://quizzon.org'),
        // themeColor: '#11C7B8',
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@joshuaepstein17',
        },
        icons,
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    }
}

export const nanoid10 = () => nanoid(10)

export const nanoid = (length: number) =>
    customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', length)()
export const prefixedId = (prefix: string, length = 16) =>
    prefix +
    customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', length)() // 16-character random string

interface SWRError extends Error {
    status: number
}

export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
    const res = await fetch(input, init)

    if (!res.ok) {
        const error = await res.text()
        const err = new Error(error) as SWRError
        err.status = res.status
        throw err
    }

    return res.json()
}

export function nFormatter(num?: number, digits?: number) {
    if (!num) return '0'
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'K' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    var item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return num >= item.value
        })
    return item ? (num / item.value).toFixed(digits || 1).replace(rx, '$1') + item.symbol : '0'
}

export function capitalize(str: string) {
    if (!str || typeof str !== 'string') return str
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Create a string of the time ago from the given timestamp to the current time
 *
 * @param timestamp The timestamp to use
 * @param timeOnly Whether or not to only return the time (with or without 'ago')
 * @returns The time ago string
 */
export const timeAgo = (timestamp?: Date, timeOnly?: boolean): string => {
    if (!timestamp) return 'never'
    return `${ms(Date.now() - new Date(timestamp).getTime())}${timeOnly ? '' : ' ago'}`
}

/**
 * Create a string of the time remaining from the current time to the given timestamp
 *
 * @param timestamp The timestamp to calculate the time remaining to
 * @returns The time till string
 */
export const timeTill = (timestamp: Date, timeOnly?: boolean): string => {
    const timeDifference = new Date(timestamp).getTime() - Date.now()
    const msInMinute = 60 * 1000
    const msInHour = 60 * msInMinute
    const msInDay = 24 * msInHour
    const msInMonth = 30 * msInDay // Approximate value for a month
    const msInYear = 365 * msInDay // Approximate value for a year

    if (timeDifference <= 0) {
        return 'now'
    } else if (timeDifference < msInMinute) {
        const seconds = Math.floor(timeDifference / 1000)
        return `${seconds} second${seconds === 1 ? '' : 's'}${timeOnly ? '' : ' till'}`
    } else if (timeDifference < msInHour) {
        const minutes = Math.floor(timeDifference / msInMinute)
        return `${minutes} minute${minutes === 1 ? '' : 's'}${timeOnly ? '' : ' till'}`
    } else if (timeDifference < msInDay) {
        const hours = Math.floor(timeDifference / msInHour)
        return `${hours} hour${hours === 1 ? '' : 's'}${timeOnly ? '' : ' till'}`
    } else if (timeDifference < msInMonth) {
        const days = Math.floor(timeDifference / msInDay)
        return `${days} day${days === 1 ? '' : 's'}${timeOnly ? '' : ' till'}`
    } else if (timeDifference < msInYear) {
        const months = Math.floor(timeDifference / msInMonth)
        return `${months} month${months === 1 ? '' : 's'}${timeOnly ? '' : ' till'}`
    } else {
        const years = Math.floor(timeDifference / msInYear)
        return `${years} year${years === 1 ? '' : 's'}${timeOnly ? '' : ' till'}`
    }
}

/**
 * Creates a string of the date and time from the given timestamp in the format 'DD/MM/YYYY HH:MM' but in the local timezone
 * @param timestamp The timestamp to use
 * @returns  The date and time string in the format 'DD/MM/YYYY HH:MM'
 */
export const getDateTimeLocal = (timestamp?: Date): string => {
    const d = timestamp ? new Date(timestamp) : new Date()
    if (d.toString() === 'Invalid Date') return ''
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .split(':')
        .slice(0, 2)
        .join(':')
}

export const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'GMT',
    })
}

export const formatDateString = (dateString: string) => {
    return formatDate(new Date(`${dateString}T00:00:00Z`))
}

export const getSearchParams = (url: string) => {
    // Create a params object
    let params = {} as Record<string, string>

    new URL(url).searchParams.forEach(function (val, key) {
        params[key] = val
    })

    return params
}

export function formatCamelCaseToSentence(str: string): string {
    let formattedStr = str.replace(/_/g, ' ') // Replace underscores with spaces
    formattedStr = formattedStr.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
    formattedStr = formattedStr.replace(/\b\w/g, (c) => c.toUpperCase()) // Capitalize first letter of each word
    return formattedStr
}
