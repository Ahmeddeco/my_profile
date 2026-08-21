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
import GroupSchema from "@/app/[locale]/server/courses/groups/modules/group.schema"
import { editGroupAction } from "@/app/[locale]/server/courses/groups/modules/group.action"
import { customSlug } from "@/helpers/customSlug"
import BatchStatusSchema from "@/generated/zod/inputTypeSchemas/BatchStatusSchema"
import {
	getAllBranchesForSelectType,
	getAllCoursesForSelectType,
	getOneGroupType,
} from "@/app/[locale]/server/courses/groups/modules/group.type"
import DatePicker from "@/components/shared/DatePicker"

type Props = {
	courses: getAllCoursesForSelectType
	branches: getAllBranchesForSelectType
	group: getOneGroupType
}

export default function EditGroup({ branches, courses, group }: Props) {
	const [slug, setSlug] = useState(group?.slug ?? "")
	const slugTitle = customSlug(slug)
	const [lastResult, action] = useActionState(editGroupAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: GroupSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" name="id" value={group?.id} />
			<div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
				{/* ---------------------------------- title --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.title.name}>{fields.title.name}</FieldLabel>
					<Input
						type="text"
						key={fields.title.key}
						name={fields.title.name}
						defaultValue={group?.title}
						onChange={(e) => setSlug(e.target.value)}
					/>
					<FieldError>{fields.title.errors}</FieldError>
				</Field>

				{/* ---------------------------------- slug ---------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.slug.name}>{fields.slug.name}</FieldLabel>
					<Input type="text" key={fields.slug.key} name={fields.slug.name} value={slugTitle} readOnly />
					<FieldError>{fields.slug.errors}</FieldError>
				</Field>

				{/* ----------------------------------- price ---------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.price.name}>price</FieldLabel>
					<Input type="number" key={fields.price.key} name={fields.price.name} defaultValue={group?.price ?? ""} />
					<FieldError>{fields.price.errors}</FieldError>
				</Field>

				{/* ----------------------------------- capacity ---------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.capacity.name}>capacity</FieldLabel>
					<Input
						type="number"
						key={fields.capacity.key}
						name={fields.capacity.name}
						defaultValue={group?.capacity ?? ""}
					/>
					<FieldError>{fields.capacity.errors}</FieldError>
				</Field>

				{/* ------------------------------ course ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.courseId.name}>course</FieldLabel>
					<Select key={fields.courseId.key} name={fields.courseId.name} defaultValue={group?.courseId}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<ScrollArea className="max-h-48">
								{courses?.map((course, index) => (
									<SelectItem value={course.id} key={index}>
										<Item variant="default" size={"xs"}>
											<ItemMedia variant={"icon"}>
												<Avatar>
													<AvatarImage src={course.mainImage ?? ""} />
													<AvatarFallback>{course.titleEn[0]}</AvatarFallback>
												</Avatar>
											</ItemMedia>
											<ItemContent>
												<ItemTitle>{course.titleEn}</ItemTitle>
											</ItemContent>
										</Item>
									</SelectItem>
								))}
							</ScrollArea>
						</SelectContent>
					</Select>
					<FieldError>{fields.courseId.errors}</FieldError>
				</Field>

				{/* ------------------------------ branches ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.branchId.name}>branch</FieldLabel>
					<Select key={fields.branchId.key} name={fields.branchId.name} defaultValue={group?.branchId}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<ScrollArea className="max-h-48">
								{branches?.map((branch, index) => (
									<SelectItem value={branch.id} key={index}>
										<Item variant="default" size={"xs"}>
											<ItemMedia variant={"icon"}>
												<Avatar>
													<AvatarImage src={branch.academy.logo ?? ""} />
													<AvatarFallback>{branch.name[0]}</AvatarFallback>
												</Avatar>
											</ItemMedia>
											<ItemContent>
												<ItemTitle>{branch.name}</ItemTitle>
											</ItemContent>
										</Item>
									</SelectItem>
								))}
							</ScrollArea>
						</SelectContent>
					</Select>
					<FieldError>{fields.branchId.errors}</FieldError>
				</Field>

				{/* ------------------------------ status ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.status.name}>status</FieldLabel>
					<Select key={fields.status.key} name={fields.status.name} defaultValue={group?.status}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<ScrollArea className="max-h-48">
								{Object.values(BatchStatusSchema.Enum).map((field) => (
									<SelectItem value={field} key={field}>
										{field}
									</SelectItem>
								))}
							</ScrollArea>
						</SelectContent>
					</Select>
					<FieldError>{fields.status.errors}</FieldError>
				</Field>

				{/* ------------------------------- startAt ------------------------------ */}
				<DatePicker
					name={fields.startAt.name}
					dateKey={fields.startAt.key}
					defaultValue={group?.startAt instanceof Date ? group.startAt.toISOString() : (group?.startAt ?? "")}
					errors={fields.startAt.errors}
				/>
				{/* ------------------------------- endAt ------------------------------ */}
				<DatePicker
					name={fields.endAt.name}
					dateKey={fields.endAt.key}
					defaultValue={group?.endAt instanceof Date ? group.endAt.toISOString() : (group?.endAt ?? "")}
					errors={fields.endAt.errors}
				/>
			</div>
			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit group"} />
		</Form>
	)
}
