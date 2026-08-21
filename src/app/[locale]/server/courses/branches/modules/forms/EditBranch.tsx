"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState, useState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BranchSchema from "@/app/[locale]/server/courses/branches/modules/branch.schema"
import { editBranchAction } from "@/app/[locale]/server/courses/branches/modules/branch.action"
import {
	getAllAcademiesForSelectType,
	getOneBranchType,
} from "@/app/[locale]/server/courses/branches/modules/branch.type"
import Phone from "@/components/shared/Phone"
import Gps from "@/components/shared/Gps"
import { customSlug } from "@/helpers/customSlug"

type Props = {
	academies: getAllAcademiesForSelectType
	branch: getOneBranchType
}

export default function EditBranch({ academies, branch }: Props) {
	const [slug, setSlug] = useState(branch?.slug ?? "")
	const slugTitle = customSlug(slug)
	const [lastResult, action] = useActionState(editBranchAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: BranchSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" name="id" value={branch?.id} />
			<div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
				{/* ---------------------------------- name --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.name.name}>{fields.name.name}</FieldLabel>
					<Input
						type="text"
						key={fields.name.key}
						name={fields.name.name}
						defaultValue={branch?.name}
						onChange={(e) => setSlug(e.target.value)}
					/>
					<FieldError>{fields.name.errors}</FieldError>
				</Field>

				{/* ---------------------------------- slug ---------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.slug.name}>{fields.slug.name}</FieldLabel>
					<Input type="text" key={fields.slug.key} name={fields.slug.name} value={slugTitle} readOnly />
					<FieldError>{fields.slug.errors}</FieldError>
				</Field>
			</div>

			{/* ------------------------------ academies ----------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.academyId.name}>academy</FieldLabel>
				<Select key={fields.academyId.key} name={fields.academyId.name} defaultValue={branch?.academyId}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<ScrollArea className="max-h-48">
							{academies?.map((academy, index) => (
								<SelectItem value={academy.id} key={index}>
									<Item variant="default" size={"xs"}>
										<ItemMedia variant={"icon"}>
											<Avatar>
												<AvatarImage src={academy.logo ?? ""} />
												<AvatarFallback>{academy.name[0]}</AvatarFallback>
											</Avatar>
										</ItemMedia>
										<ItemContent>
											<ItemTitle>{academy.name}</ItemTitle>
										</ItemContent>
									</Item>
								</SelectItem>
							))}
						</ScrollArea>
					</SelectContent>
				</Select>
				<FieldError>{fields.academyId.errors}</FieldError>
			</Field>

			{/* ----------------------------------- Tel ---------------------------------- */}
			<Phone key={fields.tel.key} name={fields.tel.name} errors={fields.tel.errors} defaultValue={branch?.tel ?? ""} />

			{/* ----------------------------------- Gps ---------------------------------- */}
			<Gps
				country={{
					label: "country",
					fieldKey: fields.country.key,
					name: fields.country.name,
					defaultValue: branch?.country ?? "",
					errors: fields.country.errors,
				}}
				state={{
					label: "state",
					fieldKey: fields.state.key,
					name: fields.state.name,
					defaultValue: branch?.state ?? "",
					errors: fields.state.errors,
				}}
				city={{
					label: "city",
					fieldKey: fields.city.key,
					name: fields.city.name,
					defaultValue: branch?.city ?? "",
					errors: fields.city.errors,
				}}
				lng={{
					label: "longitude",
					fieldKey: fields.lng.key,
					name: fields.lng.name,
					defaultValue: String(branch?.lng) ?? "",
					errors: fields.lng.errors,
				}}
				lat={{
					label: "latitude",
					fieldKey: fields.lat.key,
					name: fields.lat.name,
					defaultValue: String(branch?.lat) ?? "",
					errors: fields.lat.errors,
				}}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit branch"} />
		</Form>
	)
}
