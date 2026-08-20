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
import slugify from "slugify"
import dynamic from "next/dynamic"
import {
	getAllInstructorsForSelectType,
	getOneCourseType,
} from "@/app/[locale]/server/courses/(courses)/modules/course.type"
import { editCourseAction } from "@/app/[locale]/server/courses/(courses)/modules/course.action"
import CourseSchema from "@/app/[locale]/server/courses/(courses)/modules/course.schema"
import FieldSchema from "@/generated/zod/inputTypeSchemas/FieldSchema"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
	allInstructors: getAllInstructorsForSelectType
	course: getOneCourseType
}

export default function EditCourseForm({ allInstructors, course }: Props) {
	const [slug, setSlug] = useState(course?.slug ?? "")
	const slugTitle = slugify(slug, { lower: true, strict: true })
	const [lastResult, action] = useActionState(editCourseAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: CourseSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" name="id" value={course?.id} />
			{/* --------------------------------- title  --------------------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-6">
				{/* ---------------------------------- titleAr --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleAr.name}>{fields.titleAr.name}</FieldLabel>
					<Input type="text" key={fields.titleAr.key} name={fields.titleAr.name} defaultValue={course?.titleAr} />
					<FieldError>{fields.titleAr.errors}</FieldError>
				</Field>

				{/* ---------------------------------- titleEn --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleEn.name}>{fields.titleEn.name}</FieldLabel>
					<Input
						type="text"
						key={fields.titleEn.key}
						name={fields.titleEn.name}
						defaultValue={course?.titleEn}
						onChange={(e) => setSlug(e.target.value)}
					/>
					<FieldError>{fields.titleEn.errors}</FieldError>
				</Field>
			</div>

			{/* ---------------------------------- slug ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.slug.name}>{fields.slug.name}</FieldLabel>
				<Input type="text" key={fields.slug.key} name={fields.slug.name} value={slugTitle} readOnly />
				<FieldError>{fields.slug.errors}</FieldError>
			</Field>

			{/* ------------------------------- Description ------------------------------ */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-6">
				{/* --------------------------- descriptionAr -------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.descriptionAr.name}>{fields.descriptionAr.name}</FieldLabel>
					<Textarea
						key={fields.descriptionAr.key}
						name={fields.descriptionAr.name}
						defaultValue={course?.descriptionAr}
					/>
					<FieldError>{fields.descriptionAr.errors}</FieldError>
				</Field>

				{/* ----------------------------- descriptionEn ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.descriptionEn.name}>{fields.descriptionEn.name}</FieldLabel>
					<Textarea
						key={fields.descriptionEn.key}
						name={fields.descriptionEn.name}
						defaultValue={course?.descriptionEn}
					/>
					<FieldError>{fields.descriptionEn.errors}</FieldError>
				</Field>
			</div>

			{/* ----------------------------- detailsAr ----------------------------- */}
			<TiptapEditor
				name={fields.detailsAr.name}
				label={fields.detailsAr.name}
				editorKey={fields.detailsAr.key ?? ""}
				defaultValue={course?.detailsAr ?? ""}
				errors={fields.detailsAr.errors ?? []}
			/>

			{/* --------------------------- detailsEn -------------------------- */}
			<TiptapEditor
				name={fields.detailsEn.name}
				label={fields.detailsEn.name}
				editorKey={fields.detailsEn.key ?? ""}
				defaultValue={course?.detailsEn ?? ""}
				errors={fields.detailsEn.errors ?? []}
			/>
			<div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
				{/* ----------------------------------- price ---------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.price.name}>price</FieldLabel>
					<Input type="number" key={fields.price.key} name={fields.price.name} defaultValue={course?.price} />
					<FieldError>{fields.price.errors}</FieldError>
				</Field>

				{/* ----------------------------------- discountAmount ---------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.discountAmount.name}>discount Amount</FieldLabel>
					<Input
						type="number"
						key={fields.discountAmount.key}
						name={fields.discountAmount.name}
						defaultValue={course?.discountAmount ?? ""}
					/>
					<FieldError>{fields.discountAmount.errors}</FieldError>
				</Field>

				{/* ------------------------------ Instructors ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.instructorId.name}>Instructor</FieldLabel>
					<Select key={fields.instructorId.key} name={fields.instructorId.name} defaultValue={course?.instructorId}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<ScrollArea className="max-h-48">
								{allInstructors?.map((instructor, index) => (
									<SelectItem value={instructor.id} key={index}>
										<Item variant="default" size={"xs"}>
											<ItemMedia variant={"icon"}>
												<Avatar>
													<AvatarImage src={instructor.image ?? ""} />
													<AvatarFallback>{instructor.name[0]}</AvatarFallback>
												</Avatar>
											</ItemMedia>
											<ItemContent>
												<ItemTitle>{instructor.name}</ItemTitle>
											</ItemContent>
										</Item>
									</SelectItem>
								))}
							</ScrollArea>
						</SelectContent>
					</Select>
					<FieldError>{fields.instructorId.errors}</FieldError>
				</Field>

				{/* ------------------------------ field ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.field.name}>field</FieldLabel>
					<Select key={fields.field.key} name={fields.field.name} defaultValue={course?.field}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<ScrollArea className="max-h-48">
								{Object.values(FieldSchema.Enum).map((field) => (
									<SelectItem value={field} key={field}>
										{field}
									</SelectItem>
								))}
							</ScrollArea>
						</SelectContent>
					</Select>
					<FieldError>{fields.field.errors}</FieldError>
				</Field>
			</div>

			{/* -------------------------------- mainImage ------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.mainImage.name}
				errors={fields.mainImage.errors}
				label={fields.mainImage.name}
				dbImage={course?.mainImage}
			/>

			{/* --------------------------------- images --------------------------------- */}
			<UploadManyImagesDropZone
				imageName={fields.images.name}
				errors={fields.images.errors}
				label={fields.images.name}
				dbImages={course?.images}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit course"} />
		</Form>
	)
}
