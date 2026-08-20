"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState, useState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import dynamic from "next/dynamic"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AcademySchema from "@/app/[locale]/server/courses/academies/modules/academy.schema"
import { editAcademyAction } from "@/app/[locale]/server/courses/academies/modules/academy.action"
import {
	getAllOwnersForSelectType,
	getOneAcademyType,
} from "@/app/[locale]/server/courses/academies/modules/academy.type"
import { customSlug } from "@/helpers/customSlug"
import Phone from "@/components/shared/Phone"

const UploadOneImagesDropZone = dynamic(
	() => import("@/components/shared/UploadImagesDropZone").then((mod) => mod.UploadOneImagesDropZone),
	{ ssr: false },
)

type Props = {
	owners: getAllOwnersForSelectType
	academy: getOneAcademyType
}

export default function EditAcademy({ owners, academy }: Props) {
	const [slug, setSlug] = useState(academy?.slug ?? "")
	const slugTitle = customSlug(slug)
	const [lastResult, action] = useActionState(editAcademyAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: AcademySchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" name="id" value={academy?.id} />
			<div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
				{/* ---------------------------------- name --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.name.name}>{fields.name.name}</FieldLabel>
					<Input
						type="text"
						key={fields.name.key}
						name={fields.name.name}
						defaultValue={academy?.name}
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

				{/* --------------------------------- tel -------------------------------- */}
				<Phone
					name={fields.tel.name}
					defaultValue={academy?.tel ?? ""}
					errors={fields.tel.errors}
					label="tel"
					fieldKey={fields.tel.key}
				/>

				{/* --------------------------------- owner -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.userId.name}>owner</FieldLabel>
					<Select key={fields.userId.key} name={fields.userId.name} defaultValue={academy?.userId ?? ""}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<ScrollArea className="max-h-48">
								{owners?.map((owner, index) => (
									<SelectItem value={owner.id} key={index}>
										<Item variant="default" size={"xs"}>
											<ItemMedia variant={"icon"}>
												<Avatar>
													<AvatarImage src={owner.image ?? ""} />
													<AvatarFallback>{owner.name[0]}</AvatarFallback>
												</Avatar>
											</ItemMedia>
											<ItemContent>
												<ItemTitle>{owner.name}</ItemTitle>
											</ItemContent>
										</Item>
									</SelectItem>
								))}
							</ScrollArea>
						</SelectContent>
					</Select>
					<FieldError>{fields.userId.errors}</FieldError>
				</Field>
			</div>

			{/* --------------------------- description -------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.description.name}>{fields.description.name}</FieldLabel>
				<Textarea
					key={fields.description.key}
					name={fields.description.name}
					defaultValue={academy?.description ?? ""}
				/>
				<FieldError>{fields.description.errors}</FieldError>
			</Field>

			{/* -------------------------------- logo ------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.logo.name}
				errors={fields.logo.errors}
				label={"logo"}
				dbImage={academy?.logo ?? ""}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit academy"} />
		</Form>
	)
}
