"use client"

import { Calendar as CalendarIcon, Clock2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "../ui/input"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { useState } from "react"
import { format, isValid } from "date-fns"

type Props = {
	name: string | undefined
	dateKey: string | undefined
	defaultValue: string | undefined
	errors: string[] | undefined
}

export default function DateTimePicker({ defaultValue, dateKey, name, errors }: Props) {
	const [date, setDate] = useState<Date | undefined>(() => {
		if (!defaultValue) return undefined
		const parsed = new Date(defaultValue)
		return isValid(parsed) ? parsed : undefined
	})

	const [time, setTime] = useState<string>(() => {
		if (!defaultValue) return "12:00"
		const parsed = new Date(defaultValue)
		return isValid(parsed) ? format(parsed, "HH:mm") : "12:00"
	})

	const [open, setOpen] = useState(false)

	const getDateTime = (selectedDate: Date | undefined, timeStr: string): Date | undefined => {
		if (!selectedDate) return undefined
		const [hours, minutes] = timeStr.split(":").map(Number)
		const newDate = new Date(selectedDate)
		newDate.setHours(hours || 0, minutes || 0, 0, 0)
		return newDate
	}

	const currentDateTime = getDateTime(date, time)

	const formatDateTimeValue = (d: Date | undefined) => {
		if (!d) return ""
		// إنشاء ISO String مطابق للـ Local Time دون طرح ساعات
		const tzOffset = d.getTimezoneOffset() * 60000
		const localISOTime = new Date(d.getTime() - tzOffset).toISOString().slice(0, -1)
		return localISOTime
	}

	const handleDateSelect = (selectedDate: Date | undefined) => {
		setDate(selectedDate)
	}

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTime(e.target.value)
	}

	return (
		<Field>
			<FieldLabel htmlFor={name}>{name}</FieldLabel>
			<Popover open={open} onOpenChange={setOpen}>
				<Input type="hidden" key={dateKey} name={name} value={formatDateTimeValue(currentDateTime)} />

				<PopoverTrigger asChild>
					<Button
						variant="outline"
						data-empty={!currentDateTime}
						className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{currentDateTime ? format(currentDateTime, "dd MMM yyyy, hh:mm a") : <h6>Pick Date & Time</h6>}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-auto p-3" align="start">
					<div className="space-y-3">
						{/* اختيار اليوم */}
						<Calendar
							mode="single"
							selected={date}
							captionLayout="dropdown"
							onSelect={handleDateSelect}
							className="p-0"
						/>

						<div className="border-t pt-3 flex items-center justify-between gap-2">
							<span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
								<Clock2Icon className="h-3.5 w-3.5" /> Time
							</span>
							<Input type="time" value={time} onChange={handleTimeChange} className="w-auto text-sm py-1 h-8" />
						</div>
					</div>
				</PopoverContent>
			</Popover>
			<FieldError>{errors}</FieldError>
		</Field>
	)
}
