import { createHash } from 'crypto'

export const hashToken = (
    token: string,
    {
        noSecret = false,
    }: {
        noSecret?: boolean
    } = {}
) => {
    return createHash('sha256')
        .update(`${token}${noSecret ? '' : process.env.AUTH_SECRET}`)
        .digest('hex')
}
