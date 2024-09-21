import { TooltipProvider } from '@radix-ui/react-tooltip'

export default function Providers({ children, ...props }: { children: React.ReactNode }) {
    return <TooltipProvider>{children}</TooltipProvider>
}
