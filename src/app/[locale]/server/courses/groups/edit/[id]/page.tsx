import EditGroup from "@/app/[locale]/server/courses/groups/modules/forms/EditGroup"
import {
	getAllBranchesForSelect,
	getAllCoursesForSelect,
	getOneGroup,
} from "@/app/[locale]/server/courses/groups/modules/group.data"
import {
	getAllBranchesForSelectType,
	getAllCoursesForSelectType,
	getOneGroupType,
} from "@/app/[locale]/server/courses/groups/modules/group.type"
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
	const courses: getAllCoursesForSelectType = await getAllCoursesForSelect()
	const branches: getAllBranchesForSelectType = await getAllBranchesForSelect()
	const group: getOneGroupType = await getOneGroup(id)

	return (
		<ServerPageCard title={"edit group"} description={"edit group in the database."} href={"/server/courses/groups"}>
			<EditGroup courses={courses} branches={branches} group={group} />
		</ServerPageCard>
	)
}
