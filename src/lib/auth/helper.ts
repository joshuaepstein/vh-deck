import { Organisation } from '@prisma/client'
import prisma from '_prisma'
import { addDays, addMonths } from 'date-fns'
import { Session } from 'next-auth'
import { NextRequest } from 'next/server'
import { auth } from '.'
import { ErrorType, error } from '../api/helper'
import { API_DOMAIN } from '../constants'
import { getSearchParams } from '../utils'
import { hashToken } from './hash'

export interface WithAuthHandler {
    ({
        req,
        params,
        searchParams,
        headers,
        session,
    }: {
        req: NextRequest
        params: Record<string, string>
        searchParams: Record<string, string>
        headers?: Record<string, string>
        session: Session
    }): Promise<Response>
}

export const withAuth =
    (
        handler: WithAuthHandler,
        {
            allowAnonymous = false,
        }: {
            allowAnonymous?: boolean
        } = {}
    ) =>
    async (req: NextRequest, { params }: { params: Record<string, string> | undefined }) => {
        const searchParams = getSearchParams(req.url)
        const key = searchParams.key

        let session: Session | undefined
        let headers = {}

        const authorisationHeader = req.headers.get('Authorization')
        if (authorisationHeader) {
            if (!authorisationHeader.includes('Bearer ')) {
                return error({
                    type: ErrorType.BadRequest,
                    message: "Misconfigured authorisation header. Did you forget to add 'Bearer '?",
                })
            }

            const apiKey = authorisationHeader.replace('Bearer ', '')

            const hashedKey = hashToken(apiKey, {
                noSecret: true,
            })

            var user = await prisma.user.findFirst({
                where: {
                    tokens: {
                        some: {
                            hashedKey,
                        },
                    },
                },
            })

            if (!user) {
                return error({
                    type: ErrorType.Unauthorized,
                    message: 'Invalid API key. No user has been found through this apiBearer.',
                })
            }

            await prisma.token.update({
                where: {
                    hashedKey,
                },
                data: {
                    lastUsed: new Date(),
                },
            })

            session = {
                user: user,
                expires: addMonths(new Date(), 1).toISOString(),
            }

            headers = {
                'X-User-Id': user.id,
            }

            return handler({
                req,
                params: params || {},
                searchParams,
                headers,
                session,
            })
        } else {
            session = await auth()
            if (!session?.user.id) {
                if (allowAnonymous) {
                    // @ts-expect-error
                    return handler({
                        req,
                        params: params || {},
                        searchParams,
                        headers,
                    })
                }

                return error({
                    type: ErrorType.Unauthorized,
                    message: 'Login required.',
                })
            }

            return handler({
                req,
                params: params || {},
                searchParams,
                headers,
                session,
            })
        }
    }

interface WithSessionHandler {
    ({
        req,
        params,
        searchParams,
        session,
    }: {
        req: Request
        params: Record<string, string>
        searchParams: Record<string, string>
        session: Session
    }): Promise<Response>
}

export const withSession =
    (handler: WithSessionHandler) =>
    async (req: Request, { params }: { params: Record<string, string> }) => {
        const session = await auth()
        if (!session?.user.id) {
            return error({
                type: ErrorType.Unauthorized,
                message: 'Login required.',
            })
        }

        const searchParams = getSearchParams(req.url)
        return handler({ req, params, searchParams, session })
    }
