import { TooltipProvider } from '@/components/ui/tooltip'

export default function Providers({ children, ...props }: { children: React.ReactNode }) {
    return <TooltipProvider>{children}</TooltipProvider>
}
