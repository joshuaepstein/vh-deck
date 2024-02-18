import { blue, bold, green, magenta, red, white, yellow } from './picocolours'

export const prefixes = {
    wait: white(bold('○')),
    error: red(bold('⨯')),
    warn: yellow(bold('⚠')),
    info: blue(bold('ℹ')),
    event: green(bold('✓')),
    trace: magenta(bold('»')),
} as const

const LOGGING_METHOD = {
    log: 'log',
    warn: 'warn',
    error: 'error',
} as const

function prefixedLog(prefixType: keyof typeof prefixes, ...message: any[]) {
    if ((message[0] === '' || message[0] === undefined) && message.length === 1) {
        message.shift()
    }

    const consoleMethod: keyof typeof LOGGING_METHOD =
        prefixType in LOGGING_METHOD
            ? LOGGING_METHOD[prefixType as keyof typeof LOGGING_METHOD]
            : 'log'

    const prefix = prefixes[prefixType]
    // If there's no message, don't print the prefix but a new line
    if (message.length === 0) {
        console[consoleMethod]('')
    } else {
        console[consoleMethod](' ' + prefix, ...message)
    }
}

function bootstrap(...message: any[]) {
    console.log(' ', ...message)
}

function wait(...message: any[]) {
    prefixedLog('wait', ...message)
}

function error(...message: any[]) {
    prefixedLog('error', ...message)
}

function warn(...message: any[]) {
    prefixedLog('warn', ...message)
}

function info(...message: any[]) {
    prefixedLog('info', ...message)
}

function event(...message: any[]) {
    prefixedLog('event', ...message)
}

function trace(...message: any[]) {
    prefixedLog('trace', ...message)
}

const warnOnceMessages = new Set()
function warnOnce(...message: any[]) {
    if (!warnOnceMessages.has(message[0])) {
        warnOnceMessages.add(message.join(' '))

        warn(...message)
    }
}

const logger = {
    bootstrap,
    wait,
    error,
    warn,
    info,
    success: event,
    trace,
    warnOnce,

    fullError: (...message: any[]) => {
        const redMessages = message.map((m) => {
            if (typeof m === 'string') {
                return red(m)
            } else {
                return m
            }
        })
        prefixedLog('error', ...redMessages)
    },
    fullSuccess: (...message: any[]) => {
        const greenMessages = message.map((m) => {
            if (typeof m === 'string') {
                return green(m)
            } else {
                return m
            }
        })
        prefixedLog('event', ...greenMessages)
    },
    fullInfo: (...message: any[]) => {
        const blueMessages = message.map((m) => {
            if (typeof m === 'string') {
                return blue(m)
            } else {
                return m
            }
        })
        prefixedLog('info', ...blueMessages)
    },
}

export default logger
export { logger }
