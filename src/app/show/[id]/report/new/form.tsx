'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

/*

id        String   @id @default(uuid()) @db.Uuid

    showId String @db.Uuid

    scheduledStart DateTime?
    scheduledEnd DateTime?
    actualStart DateTime?
    actualEnd DateTime?
    breaks Int?
    totalRunTime Int?
    location String?
    rehearsalNumber Int?
    director String?
    stageManager String?

    requiredCastAndCrew Json @default("[]")
    rehearsalBreakdown Json @default("[]")
    notes Json @default("[]")
    

    show Show @relation(fields: [showId], references: [id])
    
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
*/

export default function ReportForm() {
    const [startDateTime, setStartDateTime] = React.useState<string>()
    const [endDateTime, setEndDateTime] = React.useState<string>()
    const [actualStartDateTime, setActualStartDateTime] = React.useState<string>()
    const [actualEndDateTime, setActualEndDateTime] = React.useState<string>()
    const [breaks, setBreaks] = React.useState<number>()
    const [totalRunTime, setTotalRunTime] = React.useState<number>()
    const [location, setLocation] = React.useState<string>()
    const [rehearsalNumber, setRehearsalNumber] = React.useState<number>()
    const [director, setDirector] = React.useState<string>()
    const [stageManager, setStageManager] = React.useState<string>()

    return (
        <form className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label>Scheduled Start</Label>
                <Input
                    type="datetime-local"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Scheduled End</Label>
                <Input
                    type="datetime-local"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Actual Start</Label>
                <Input
                    type="datetime-local"
                    value={actualStartDateTime}
                    onChange={(e) => setActualStartDateTime(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Actual End</Label>
                <Input
                    type="datetime-local"
                    value={actualEndDateTime}
                    onChange={(e) => setActualEndDateTime(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Breaks</Label>
                <Input
                    type="number"
                    value={breaks}
                    onChange={(e) => setBreaks(Number(e.target.value))}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Total Run Time</Label>
                <Input
                    type="number"
                    value={totalRunTime}
                    onChange={(e) => setTotalRunTime(Number(e.target.value))}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Location</Label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Rehearsal Number</Label>
                <Input
                    type="number"
                    value={rehearsalNumber}
                    onChange={(e) => setRehearsalNumber(Number(e.target.value))}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Director</Label>
                <Input value={director} onChange={(e) => setDirector(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Stage Manager</Label>
                <Input value={stageManager} onChange={(e) => setStageManager(e.target.value)} />
            </div>
        </form>
    )
}
