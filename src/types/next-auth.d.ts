import { User } from '@/types/auth'

declare module 'next-auth' {
    interface Session {
        user: User
    }
}
