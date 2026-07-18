"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import Phone from "@/components/shared/Phone"
import CountryInput from "@/components/shared/CountryInput"
import { editUserAction } from "@/actions/user.action"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { Role } from "@/generated/prisma/enums"
import { User } from "@/generated/prisma/client"
import UserSchema from "@/schemas/UserSchema"

type Props = {
	user: User
}

export default function EditUser({ user }: Props) {
	const [lastResult, action] = useActionState(editUserAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: UserSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" value={user.id} name="id" />
			{/* ---------------------------------- name --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.name.name}>{fields.name.name}</FieldLabel>
				<Input
					type="text"
					key={fields.name.key}
					name={fields.name.name}
					defaultValue={user.name ?? ""}
					placeholder="Ahmed"
				/>
				<FieldError>{fields.name.errors}</FieldError>
			</Field>

			{/* -------------------------------- email -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.email.name}>{fields.email.name}</FieldLabel>
				<Input
					type="email"
					key={fields.email.key}
					name={fields.email.name}
					defaultValue={user.email}
					placeholder="someone@email.com"
				/>
				<FieldError>{fields.email.errors}</FieldError>
			</Field>

			{/* --------------------------------- mobile --------------------------------- */}
			<Phone name={fields.mobile.name} defaultValue={user.mobile ?? ""} errors={fields.mobile.errors} />

			{/* ---------------------------------- role ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.role.name}>{fields.role.name}</FieldLabel>
				<Select key={fields.role.key} name={fields.role.name} defaultValue={user.role ?? Role.user}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{Object.entries(Role).map(([key, value]) => (
							<SelectItem value={value} key={value}>
								{key}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.role.errors}</FieldError>
			</Field>

			{/* --------------------------------- address -------------------------------- */}
			<CountryInput
				cityName={fields.city.name}
				countryName={fields.country.name}
				stateName={fields.state.name}
				userCountry={user.country ?? ""}
				userState={user.state ?? ""}
				userCity={user.city ?? ""}
			/>

			{/* ---------------------------------- image --------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.image.name}
				imageKey={fields.image.key}
				errors={fields.image.errors}
				dbImage={user.image ?? ""}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit user"} />
		</Form>
	)
}
