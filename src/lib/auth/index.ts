import type { User } from '@/types/auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '_prisma'
import NextAuth, { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'
import { verifyPassword } from '../encryption'
import logger from '../logs'

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        })

        return user // Return first.
    } catch (error) {
        console.error('Failed to fetch user: ', error)
        throw new Error('Failed to fetch user')
    }
}

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

export const authConfig: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials): Promise<User | null> {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const user = await getUser(email)
                    if (!user) return null
                    const passwordsMatch = await verifyPassword(password, user.password)

                    if (passwordsMatch) {
                        return user
                    }
                }

                return null
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    cookies: {
        // sessionToken: {
        //   name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
        //   options: {
        //     httpOnly: true,
        //     sameSite: "lax",
        //     path: "/",
        //     domain: VERCEL_DEPLOYMENT
        //       ? `.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
        //       : undefined,
        //     secure: VERCEL_DEPLOYMENT,
        //   },
        // },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            const isOnLogin = nextUrl.pathname.startsWith('/login')
            const isOnRegister = nextUrl.pathname.startsWith('/register')
            const isOnLogout = nextUrl.pathname.startsWith('/logout')
            if (isOnLogout && !isLoggedIn) {
                return Response.redirect(new URL('/login', nextUrl))
            }
            if (isLoggedIn && (isOnLogin || isOnRegister)) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }
            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to the login page.
            }
            return true
        },
        // @ts-ignore
        session: async ({ session, token }) => {
            session.user = {
                id: token.sub,
                // @ts-ignore
                ...(token || session).user,
            }
            return session
        },
        async jwt({ token, user, account, trigger }) {
            if (user) {
                token.user = user
            }

            // refresh the user's data if they update their name / email
            if (trigger === 'update') {
                const refreshedUser = await getUser(token.email)
                if (refreshedUser) {
                    token.user = refreshedUser
                } else {
                    return {}
                }
            }

            return token
        },
    },
    events: {
        async signIn(message) {
            if (message.isNewUser) {
                const email = message.user.email as string
                const user = await prisma.user.findUnique({
                    where: { email },
                    select: {
                        name: true,
                        createdAt: true,
                    },
                })

                if (user.createdAt && new Date(user.createdAt).getTime() > Date.now() - 10000) {
                    // TODO: add to main resend audience
                    // TODO: Run sendEmail with WelcomeEmail
                    // * await Promise.allSettled([]);
                    logger.info(`Welcoming new user: ${user.name} <${email}>`)
                }
            }
        },
    },
}

export const { signIn, auth, signOut, handlers } = NextAuth(authConfig)
