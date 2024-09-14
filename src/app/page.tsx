import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import prisma from '@/lib/prisma'
import Link from 'next/link'

async function getShows() {
    'use server'
    return await prisma.show.findMany({
        select: {
            productionName: true,
            // reports: true,
            _count: {
                select: {
                    reports: true,
                },
            },
            createdAt: true,
            id: true,
            director: true,
        },
    })
}

export default async function HomePage() {
    const shows = await getShows()

    return (
        <>
            <MaxWidthWrapper>
                <div className="mt-16 flex w-full flex-row items-center justify-between">
                    <h1 className="text-3xl font-medium text-zinc-700">Shows</h1>
                    <Button variant="default" asChild>
                        <Link href="/new-show">New Show</Link>
                    </Button>
                </div>
                <ul className="mt-8 flex flex-col gap-4">
                    {shows.map((show) => (
                        <li key={show.id}>
                            <Link
                                className="-mx-4 flex flex-row items-center justify-between rounded-lg bg-zinc-100 px-4 py-2 transition hover:bg-zinc-50"
                                href={`/show/${show.id}`}
                            >
                                <Tooltip>
                                    <TooltipTrigger>
                                        <p className="font-medium">{show.productionName}</p>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {show.director && (
                                            <p className="text-sm font-medium">
                                                Director: {show.director}
                                            </p>
                                        )}
                                        <p className="text-sm">
                                            Created: {show.createdAt.toLocaleString()}
                                        </p>
                                        <p className="text-sm">Reports: {show._count.reports}</p>
                                    </TooltipContent>
                                </Tooltip>
                                <p className="font-semibold text-blue-800">{show._count.reports}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </MaxWidthWrapper>
        </>
    )
}
