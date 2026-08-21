import { getAllAcademiesForSelect, getOneBranch } from "@/app/[locale]/server/courses/branches/modules/branch.data"
import {
	getAllAcademiesForSelectType,
	getOneBranchType,
} from "@/app/[locale]/server/courses/branches/modules/branch.type"
import EditBranch from "@/app/[locale]/server/courses/branches/modules/forms/EditBranch"
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
	const academies: getAllAcademiesForSelectType = await getAllAcademiesForSelect()
	const branch: getOneBranchType = await getOneBranch(id)

	return (
		<ServerPageCard
			title={"edit branch"}
			description={"edit branch to the database."}
			href={"/server/courses/branches"}
		>
			<EditBranch academies={academies} branch={branch} />
		</ServerPageCard>
	)
}
