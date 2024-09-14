'use server'

import prisma from '@/lib/prisma'
import { put } from '@vercel/blob'

export default async function createShow(prevState: string | undefined, data: FormData) {
    var productionName = data.get('productionName')
    var director = data.get('director')
    var stageManager = data.get('stageManager')
    var defaultLocation = data.get('defaultLocation')
    var defaultScheduledStart = data.get('defaultScheduledStart')
    var scheduledStartDefault: Date = null
    var defaultScheduledEnd = data.get('defaultScheduledEnd')
    var scheduledEndDefault: Date = null
    var productionLogo = data.get('productionLogo') // should be a file

    if (!productionName) return 'Please provide a production name'

    if (typeof productionName !== 'string') return 'The production name field must be a string'
    if (director && typeof director !== 'string') return 'The director field must be a string'
    if (stageManager && typeof stageManager !== 'string')
        return 'The stage manager field must be a string'
    if (defaultLocation && typeof defaultLocation !== 'string')
        return 'The default location field must be a string'
    if (defaultScheduledStart && typeof defaultScheduledStart !== 'string') {
        return 'The default scheduled start field must be a string'
    } else {
        if (defaultScheduledStart && typeof defaultScheduledStart === 'string') {
            scheduledStartDefault = new Date(defaultScheduledStart)
        }
    }
    if (defaultScheduledEnd && typeof defaultScheduledEnd !== 'string') {
        return 'The default scheduled end field must be a string'
    } else {
        if (defaultScheduledEnd && typeof defaultScheduledEnd === 'string') {
            scheduledEndDefault = new Date(defaultScheduledEnd)
        }
    }

    var show = {
        productionName,
        director,
        stageManager,
        defaultLocation,
        defaultScheduledStart: scheduledStartDefault,
        defaultScheduledEnd: scheduledEndDefault,
        // productionLogoUrl,
        productionLogoUrl: null,
    }

    if (productionLogo) {
        const putting = await put('reportgenerator/production-logo', productionLogo, {
            access: 'public',
        })

        if (putting.url) {
            show.productionLogoUrl = putting.url
        }
    } else {
        delete show.productionLogoUrl
    }

    const createdShow = await prisma.show.create({
        data: {
            productionName,
            ...(director && { director: director as string }),
            ...(stageManager && { stageManager: stageManager as string }),
            ...(defaultLocation && { defaultLocation: defaultLocation as string }),
            ...(scheduledStartDefault && { defaultScheduledStart: scheduledStartDefault }),
            ...(scheduledEndDefault && { defaultScheduledEnd: scheduledEndDefault as Date }),
            ...(show.productionLogoUrl && { productionLogoUrl: show.productionLogoUrl }),
        },
    })

    if (createdShow) {
        return 'Created show'
    }

    return 'Failed to create show'
}
