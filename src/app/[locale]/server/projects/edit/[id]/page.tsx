import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getAllClients, getOneProject } from "@/app/[locale]/server/projects/modules/project.data"
import EditProject from "@/app/[locale]/server/projects/modules/forms/EditProject"
import { Role } from "@/generated/prisma/enums"
import { getAllClientsType, getOneProjectType } from "@/app/[locale]/server/projects/modules/project.type"
import { connection } from "next/server"

type Props = {
	params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: Props) {
	await connection()
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
