import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/server/ServerPageCard"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"
import AddBranch from "@/app/[locale]/server/courses/branches/modules/forms/AddBranch"
import { getAllAcademiesForSelectType } from "@/app/[locale]/server/courses/branches/modules/branch.type"
import { getAllAcademiesForSelect } from "@/app/[locale]/server/courses/branches/modules/branch.data"

export default async function AddProjectPage() {
	await connection()
	await isAllowedRoles([Role.admin, Role.instructor])
	const academies: getAllAcademiesForSelectType = await getAllAcademiesForSelect()

	return (
		<ServerPageCard title={"add branch"} description={"Add branch to the database."} href={"/server/courses/branches"}>
			<AddBranch academies={academies} />
		</ServerPageCard>
	)
}
