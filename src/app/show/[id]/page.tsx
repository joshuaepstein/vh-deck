import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

async function getShow(id: string) {
    'use server'
    return await prisma.show.findUnique({
        where: {
            id,
        },
        select: {
            productionName: true,
            director: true,
            stageManager: true,
            createdAt: true,
            id: true,
            reports: true,
            defaultLocation: true,
            defaultScheduledEnd: true,
            defaultScheduledStart: true,
            productionLogoUrl: true,
            updatedAt: true,
        },
    })
}

export default async function ShowPage({ params: { id } }: { params: { id: string } }) {
    const show = await getShow(id)

    return (
        <MaxWidthWrapper className="mt-16">
            {show.productionLogoUrl && (
                <img className="mb-5 h-16" src={show.productionLogoUrl} alt={show.productionName} />
            )}
            <h1 className="text-3xl font-medium text-zinc-700">{show.productionName}</h1>
            {show.director && <p className="text-sm font-medium">Director: {show.director}</p>}
            {show.stageManager && (
                <p className="text-sm font-medium">Stage Manager: {show.stageManager}</p>
            )}

            <div className="mt-8 flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between">
                    <h3 className="text-xl font-medium text-zinc-500">Reports</h3>
                    <Button variant="default" asChild>
                        <Link href={`/show/${id}/report/new`}>New Report</Link>
                    </Button>
                </div>
                {show.reports.map((report) => (
                    <div key={report.id} className="flex flex-col gap-2">
                        <p className="text-sm font-medium">{report.director}</p>
                        <p className="text-sm">{report.createdAt.toLocaleString()}</p>
                        <p className="text-sm">{report.updatedAt.toLocaleString()}</p>
                        <p className="text-sm">{report.location}</p>
                    </div>
                ))}
            </div>
        </MaxWidthWrapper>
    )
}
