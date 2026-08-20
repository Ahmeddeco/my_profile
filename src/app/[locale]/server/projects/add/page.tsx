import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/server/ServerPageCard"
import AddProject from "@/app/[locale]/server/projects/modules/forms/AddProject"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"
import { getAllClientsType } from "@/app/[locale]/server/projects/modules/project.type"
import { getAllClients } from "@/app/[locale]/server/projects/modules/project.data"

export default async function AddProjectPage() {
	await connection()
	await isAllowedRoles([Role.admin])
	const allClients: getAllClientsType = await getAllClients()

	return (
		<ServerPageCard title={"add project"} description={"Add project to the database."} href={"/server/projects"}>
			<AddProject allClients={allClients} />
		</ServerPageCard>
	)
}
