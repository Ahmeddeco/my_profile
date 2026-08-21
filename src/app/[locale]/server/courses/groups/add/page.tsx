import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/server/ServerPageCard"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"
import AddGroup from "@/app/[locale]/server/courses/groups/modules/forms/AddGroup"
import {
	getAllBranchesForSelectType,
	getAllCoursesForSelectType,
} from "@/app/[locale]/server/courses/groups/modules/group.type"
import {
	getAllBranchesForSelect,
	getAllCoursesForSelect,
} from "@/app/[locale]/server/courses/groups/modules/group.data"

export default async function AddGroupPage() {
	await connection()
	await isAllowedRoles([Role.admin, Role.instructor])
	const courses: getAllCoursesForSelectType = await getAllCoursesForSelect()
	const branches: getAllBranchesForSelectType = await getAllBranchesForSelect()

	return (
		<ServerPageCard title={"add group"} description={"Add group to the database."} href={"/server/courses/groups"}>
			<AddGroup courses={courses} branches={branches} />
		</ServerPageCard>
	)
}
