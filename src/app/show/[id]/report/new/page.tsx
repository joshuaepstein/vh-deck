import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import ReportForm from './form'

export default function NewReportPage() {
    return (
        <MaxWidthWrapper className="mt-16">
            <h1 className="text-3xl font-medium text-zinc-700">New Report</h1>
            <ReportForm />
        </MaxWidthWrapper>
    )
}
