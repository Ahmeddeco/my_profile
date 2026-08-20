import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/server/ServerPageCard"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"
import { getAllOwnersForSelectType } from "@/app/[locale]/server/courses/academies/modules/academy.type"
import { getAllOwnersForSelect } from "@/app/[locale]/server/courses/academies/modules/academy.data"
import AddAcademy from "@/app/[locale]/server/courses/academies/modules/forms/AddAcademy"

export default async function AddProjectPage() {
	await connection()
	await isAllowedRoles([Role.admin, Role.instructor])
	const owners: getAllOwnersForSelectType = await getAllOwnersForSelect()

	return (
		<ServerPageCard
			title={"add academy"}
			description={"Add academy to the database."}
			href={"/server/courses/academies"}
		>
			<AddAcademy owners={owners} />
		</ServerPageCard>
	)
}
