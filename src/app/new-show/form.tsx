'use client'

import { Button } from '@/components/ui/button'
import LoadingCircle from '@/components/ui/icons/loading-circle'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/cn'
import { useFormState, useFormStatus } from 'react-dom'
import createShow from './action'

export default function NewShowForm() {
    const [formMessage, submit] = useFormState(createShow, undefined)

    return (
        <>
            <form className="mt-16" action={submit}>
                <div className="flex flex-col gap-4">
                    <Label>Production Name</Label>
                    <Input name="productionName" placeholder="The Name of the Show" />
                </div>
                <div className="flex flex-col gap-4">
                    <Label>Production Logo</Label>
                    <Input name="productionLogo" type="file" accept="image/*" />
                </div>
                <NewShowFormButton />
                {formMessage && (
                    <div
                        className={cn('mt-4 text-sm text-red-500', {
                            'text-green-500': formMessage === 'Created show',
                        })}
                    >
                        {formMessage}
                    </div>
                )}
            </form>
        </>
    )
}

function NewShowFormButton() {
    const { pending } = useFormStatus()

    return (
        <Button variant="default" type="submit" disabled={pending} className="mt-8">
            {pending && <LoadingCircle className="mr-2 size-4" />}
            {pending ? 'Creating Show...' : 'Create Show'}
        </Button>
    )
}
