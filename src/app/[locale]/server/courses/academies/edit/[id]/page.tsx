import { getAllOwnersForSelect, getOneAcademy } from "@/app/[locale]/server/courses/academies/modules/academy.data"
import {
	getAllOwnersForSelectType,
	getOneAcademyType,
} from "@/app/[locale]/server/courses/academies/modules/academy.type"
import EditAcademy from "@/app/[locale]/server/courses/academies/modules/forms/EditAcademy"
import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/server/ServerPageCard"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"

type Props = {
	params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: Props) {
	await connection()
	await isAllowedRoles([Role.admin, Role.instructor])
	const id = (await params).id
	const owners: getAllOwnersForSelectType = await getAllOwnersForSelect()
	const academy: getOneAcademyType = await getOneAcademy(id)

	return (
		<ServerPageCard
			title={"edit Academy"}
			description={"edit Academy in the database."}
			href={"/server/courses/academies"}
		>
			<EditAcademy owners={owners} academy={academy} />
		</ServerPageCard>
	)
}
