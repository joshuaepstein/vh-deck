import { SessionProvider } from 'next-auth/react'

export default function Providers({ children, ...props }: { children: React.ReactNode }) {
    return (
        <>
            <>
                {/* @ts-ignore */}
                <SessionProvider session={props.session}>{children}</SessionProvider>
            </>
        </>
    )
}
