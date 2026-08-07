"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState, useState } from "react"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadManyImagesDropZone, UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import TiptapEditor from "@/components/shared/TiptapEditor"
import DatePicker from "@/components/shared/DatePicker"
import slugify from "slugify"
import { editArticleAction } from "@/actions/article.action"
import ArticleSchema from "@/schemas/ArticleSchema"
import { Textarea } from "@/components/ui/textarea"
import { getOneArticleType } from "@/types/article.type"
import { getAllAdminsType } from "@/types/user.type"

type Props = {
	authors: getAllAdminsType
	article: getOneArticleType
}

export default function EditArticle({ authors, article }: Props) {
	const [slug, setSlug] = useState(article?.slug ?? "")
	const slugTitle = slugify(slug, { lower: true })

	const [lastResult, action] = useActionState(editArticleAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ArticleSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" name="id" value={article?.id} />
			{/* ---------------------------- title  ---------------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* ---------------------------------- titleAr --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleAr.name}>{fields.titleAr.name}</FieldLabel>
					<Input type="text" key={fields.titleAr.key} name={fields.titleAr.name} defaultValue={article?.titleAr} />
					<FieldError>{fields.titleAr.errors}</FieldError>
				</Field>

				{/* ---------------------------------- titleEn --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleEn.name}>{fields.titleEn.name}</FieldLabel>
					<Input
						type="text"
						key={fields.titleEn.key}
						name={fields.titleEn.name}
						defaultValue={article?.titleEn}
						onChange={(e) => setSlug(e.target.value)}
					/>
					<FieldError>{fields.titleEn.errors}</FieldError>
				</Field>
			</div>
			{/* ---------------------------------- slug ---------------------------------- */}
			<Field>
				<FieldLabel>slug</FieldLabel>
				<FieldDescription>This field fill automatically when you fill the titleEn field.</FieldDescription>
				<Input type="text" name={"slug"} value={slugTitle} readOnly />
			</Field>

			{/* ------------------------ authors & createdAt ----------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* --------------------------------- authors -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.userId.name}>{"author"}</FieldLabel>
					<Select key={fields.userId.key} name={fields.userId.name} defaultValue={article?.author.id}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{authors?.map(({ id, name }) => (
								<SelectItem value={id} key={id}>
									{name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.userId.errors}</FieldError>
				</Field>

				{/* -------------------------------- createdAt ------------------------------- */}
				<DatePicker
					name={fields.createdAt.name}
					defaultValue={article?.createdAt ? article.createdAt.toISOString() : undefined}
					errors={fields.createdAt.errors}
					key={fields.createdAt.key}
				/>
			</div>

			{/* ------------------------------- description ------------------------------ */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* ---------------------------- descriptionAr --------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.descriptionAr.name}>{fields.descriptionAr.name}</FieldLabel>
					<Textarea
						key={fields.descriptionAr.key}
						name={fields.descriptionAr.name}
						defaultValue={article?.descriptionAr}
					/>
					<FieldError>{fields.descriptionAr.errors}</FieldError>
				</Field>

				{/* ---------------------------- descriptionEn --------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.descriptionEn.name}>{fields.descriptionEn.name}</FieldLabel>
					<Textarea
						key={fields.descriptionEn.key}
						name={fields.descriptionEn.name}
						defaultValue={article?.descriptionEn}
					/>
					<FieldError>{fields.descriptionEn.errors}</FieldError>
				</Field>
			</div>

			{/* ----------------------------- topicAr ----------------------------- */}
			<TiptapEditor
				name={fields.topicAr.name}
				label={fields.topicAr.name}
				editorKey={fields.topicAr.key ?? ""}
				defaultValue={article?.topicAr ?? ""}
				errors={fields.topicAr.errors ?? []}
			/>

			{/* --------------------------- topicEn -------------------------- */}
			<TiptapEditor
				name={fields.topicEn.name}
				label={fields.topicEn.name}
				editorKey={fields.topicEn.key ?? ""}
				defaultValue={article?.topicEn ?? ""}
				errors={fields.topicEn.errors ?? []}
			/>

			{/* -------------------------------- mainImage ------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.mainImage.name}
				errors={fields.mainImage.errors}
				label={fields.mainImage.name}
				dbImage={article?.mainImage}
			/>

			{/* --------------------------------- images --------------------------------- */}
			<UploadManyImagesDropZone
				imageName={fields.images.name}
				errors={fields.images.errors}
				label={fields.images.name}
				dbImages={article?.images}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit article"} />
		</Form>
	)
}
