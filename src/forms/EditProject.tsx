"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState, useState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { Textarea } from "@/components/ui/textarea"
import { editProjectAction } from "@/actions/project.action"
import ProjectSchema from "@/schemas/ProjectSchema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DatePicker from "@/components/shared/DatePicker"
import { getAllClientsType } from "@/types/user.type"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getOneProjectType } from "@/types/project.type"
import { ProductType } from "@/generated/prisma/enums"
import slugify from "slugify"
import dynamic from "next/dynamic"

const TiptapEditor = dynamic(() => import("@/components/shared/TiptapEditor"), { ssr: false })
const UploadManyImagesDropZone = dynamic(
	() => import("@/components/shared/UploadImagesDropZone").then((mod) => mod.UploadManyImagesDropZone),
	{ ssr: false },
)
const UploadOneImagesDropZone = dynamic(
	() => import("@/components/shared/UploadImagesDropZone").then((mod) => mod.UploadOneImagesDropZone),
	{ ssr: false },
)

type Props = {
	allClients: getAllClientsType
	oneProject: getOneProjectType
}

export default function EditProject({ allClients, oneProject }: Props) {
	const [slug, setSlug] = useState(oneProject?.slug)

	const [lastResult, action] = useActionState(editProjectAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ProjectSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" name="slug" value={oneProject?.slug} />
			{/* ---------------------------- title & model ---------------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-6">
				{/* ---------------------------------- titleAr --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleAr.name}>{fields.titleAr.name}</FieldLabel>
					<Input type="text" key={fields.titleAr.key} name={fields.titleAr.name} defaultValue={oneProject?.titleAr} />
					<FieldError>{fields.titleAr.errors}</FieldError>
				</Field>

				{/* ---------------------------------- titleEn --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleEn.name}>{fields.titleEn.name}</FieldLabel>
					<Input
						type="text"
						key={fields.titleEn.key}
						name={fields.titleEn.name}
						defaultValue={oneProject?.titleEn}
						onChange={(e) => setSlug(slugify(e.target.value))}
					/>
					<FieldError>{fields.titleEn.errors}</FieldError>
				</Field>
			</div>

			{/* ---------------------------------- slug ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.slug.name}>{fields.slug.name}</FieldLabel>
				<Input type="text" key={fields.slug.key} name={fields.slug.name} value={slug} readOnly />
				<FieldError>{fields.slug.errors}</FieldError>
			</Field>

			{/* ----------------------------- miniDescription ---------------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-6">
				{/* --------------------------- miniDescriptionAr -------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.miniDescriptionAr.name}>{fields.miniDescriptionAr.name}</FieldLabel>
					<Textarea
						key={fields.miniDescriptionAr.key}
						name={fields.miniDescriptionAr.name}
						defaultValue={oneProject?.miniDescriptionAr}
					/>
					<FieldError>{fields.miniDescriptionAr.errors}</FieldError>
				</Field>

				{/* ----------------------------- miniDescriptionEn ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.miniDescriptionEn.name}>{fields.miniDescriptionEn.name}</FieldLabel>
					<Textarea
						key={fields.miniDescriptionEn.key}
						name={fields.miniDescriptionEn.name}
						defaultValue={oneProject?.miniDescriptionEn}
					/>
					<FieldError>{fields.miniDescriptionEn.errors}</FieldError>
				</Field>
			</div>

			{/* ----------------------------- descriptionAr ----------------------------- */}
			<TiptapEditor
				name={fields.descriptionAr.name}
				label={fields.descriptionAr.name}
				editorKey={fields.descriptionAr.key ?? ""}
				defaultValue={oneProject?.descriptionAr ?? ""}
				errors={fields.descriptionAr.errors ?? []}
			/>

			{/* --------------------------- descriptionEn -------------------------- */}
			<TiptapEditor
				name={fields.descriptionEn.name}
				label={fields.descriptionEn.name}
				editorKey={fields.descriptionEn.key ?? ""}
				defaultValue={oneProject?.descriptionEn ?? ""}
				errors={fields.descriptionEn.errors ?? []}
			/>
			<div className="flex lg:flex-row flex-col items-center justify-center gap-6">
				{/* -------------------------------- createdAt ------------------------------- */}
				<DatePicker
					dateKey={fields.createdAt.key}
					name={fields.createdAt.name}
					defaultValue={
						oneProject?.createdAt instanceof Date
							? oneProject.createdAt.toISOString().split("T")[0]
							: (oneProject?.createdAt ?? "")
					}
					errors={fields.createdAt.errors}
				/>

				{/* ----------------------------------- url ---------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.url.name}>{fields.url.name}</FieldLabel>
					<Input type="url" key={fields.url.key} name={fields.url.name} defaultValue={oneProject?.url} />
					<FieldError>{fields.url.errors}</FieldError>
				</Field>

				{/* --------------------------------- client --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.userId.name}>client</FieldLabel>
					<Select key={fields.userId.key} name={fields.userId.name} defaultValue={oneProject?.userId}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<ScrollArea className="max-h-48">
								{allClients?.map((client, index) => (
									<SelectItem value={client.id} key={index}>
										{client.name}
									</SelectItem>
								))}
							</ScrollArea>
						</SelectContent>
					</Select>
					<FieldError>{fields.userId.errors}</FieldError>
				</Field>

				{/* --------------------------------- type --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.type.name}>type</FieldLabel>
					<Select key={fields.type.key} name={fields.type.name} defaultValue={oneProject?.type}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<ScrollArea className="max-h-48">
								{Object.values(ProductType).map((type, index) => (
									<SelectItem value={type} key={index}>
										{type}
									</SelectItem>
								))}
							</ScrollArea>
						</SelectContent>
					</Select>
					<FieldError>{fields.type.errors}</FieldError>
				</Field>
			</div>

			{/* -------------------------------- mainImage ------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.mainImage.name}
				errors={fields.mainImage.errors}
				label={fields.mainImage.name}
				dbImage={oneProject?.mainImage}
			/>

			{/* --------------------------------- images --------------------------------- */}
			<UploadManyImagesDropZone
				imageName={fields.images.name}
				errors={fields.images.errors}
				label={fields.images.name}
				dbImages={oneProject?.images ?? []}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit project"} />
		</Form>
	)
}
