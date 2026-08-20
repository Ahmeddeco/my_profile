import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/server/ServerPageCard"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"
import AddCourseForm from "@/app/[locale]/server/courses/(courses)/modules/forms/AddCourseForm"
import { getAllInstructorsForSelectType } from "@/app/[locale]/server/courses/(courses)/modules/course.type"
import { getAllInstructorsForSelect } from "@/app/[locale]/server/courses/(courses)/modules/course.data"

export default async function AddProjectPage() {
	await connection()
	await isAllowedRoles([Role.admin, Role.instructor])
	const allInstructors: getAllInstructorsForSelectType = await getAllInstructorsForSelect()

	return (
		<ServerPageCard title={"add course"} description={"Add course to the database."} href={"/server/courses"}>
			<AddCourseForm allInstructors={allInstructors} />
		</ServerPageCard>
	)
}
