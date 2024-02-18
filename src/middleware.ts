import { auth } from './lib/auth'

export default auth((req) => {})

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api/ routes
         * 2. /_next/ (Next.js internals)
         * 3. /_proxy/ (special page for OG tags proxying)
         * 4. /_static (inside /public)
         * 5. /_vercel (Vercel internals)
         * 6. /favicon.ico, /sitemap.xml, /robots.txt (static files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
