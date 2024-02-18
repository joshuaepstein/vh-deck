export const INTERVALS = [
    {
        display: 'Last hour',
        slug: '1h',
    },
    {
        display: 'Last 24 hours',
        slug: '24h',
    },
    {
        display: 'Last 7 days',
        slug: '7d',
    },
    {
        display: 'Last 30 days',
        slug: '30d',
    },
    {
        display: 'Last 3 months',
        slug: '90d',
    },
]

export const FRAMER_MOTION_LIST_ITEM_VARIANTS = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: 'spring' } },
}

export const STAGGER_CHILD_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, type: 'spring' } },
}

export const SWIPE_REVEAL_ANIMATION_SETTINGS = {
    initial: { height: 0 },
    animate: { height: 'auto' },
    exit: { height: 0 },
    transition: { duration: 0.15, ease: 'easeOut' },
}

export const FADE_IN_ANIMATION_SETTINGS = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
}

export const API_DOMAIN =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? 'https://quizzon.uk/api'
        : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
          ? 'https://staging.quizzon.uk/api'
          : 'http://localhost:3000/api'

export const FAVICON_FOLDER = '/'
export const GOOGLE_FAVICON_URL = 'https://www.google.com/s2/favicons?sz=64&domain_url='
export { default as ccTLDs } from './cctlds'
export { default as COUNTRIES } from './countries'
