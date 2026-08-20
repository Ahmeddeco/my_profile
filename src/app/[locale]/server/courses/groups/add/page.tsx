import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"
import { getAllInstructorsForSelectType } from "@/app/[locale]/server/courses/(courses)/modules/course.type"
import { getAllInstructorsForSelect } from "@/app/[locale]/server/courses/(courses)/modules/course.data"
import AddBatch from "@/app/[locale]/server/courses/groups/modules/forms/AddBatch"

export default async function AddProjectPage() {
	await connection()
	await isAllowedRoles([Role.admin, Role.instructor])
	const allInstructors: getAllInstructorsForSelectType = await getAllInstructorsForSelect()

	return (
		<ServerPageCard title={"add course"} description={"Add course to the database."} href={"/server/courses"}>
			<AddBatch allInstructors={allInstructors} />
		</ServerPageCard>
	)
}
