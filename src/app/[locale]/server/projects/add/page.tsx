import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getAllClients } from "@/dl/users.data"
import AddProject from "@/forms/AddProject"
import { Role } from "@/generated/prisma/enums"
import { getAllClientsType } from "@/types/user.type"
import { connection } from "next/server"

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
