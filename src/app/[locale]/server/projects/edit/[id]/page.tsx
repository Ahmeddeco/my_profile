import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getOneProject } from "@/dl/project.data"
import { getAllClients } from "@/dl/users.data"
import EditProject from "@/forms/EditProject"
import { Role } from "@/generated/prisma/enums"
import { getOneProjectType } from "@/types/project.type"
import { getAllClientsType } from "@/types/user.type"

type Props = {
	params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: Props) {
	await isAllowedRoles([Role.admin])
	const id = (await params).id
	const allClients: getAllClientsType = await getAllClients()
	const oneProject: getOneProjectType = await getOneProject(id)

	return (
		<ServerPageCard title={"edit project"} description={"edit project in the database."} href={"/server/projects"}>
			<EditProject allClients={allClients} oneProject={oneProject} />
		</ServerPageCard>
	)
}
