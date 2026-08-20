import { getAllInstructorsForSelect, getOneCourse } from "@/app/[locale]/server/courses/(courses)/modules/course.data"
import {
	getAllInstructorsForSelectType,
	getOneCourseType,
} from "@/app/[locale]/server/courses/(courses)/modules/course.type"
import EditCourseForm from "@/app/[locale]/server/courses/(courses)/modules/forms/EditCourseForm"
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
	const allInstructors: getAllInstructorsForSelectType = await getAllInstructorsForSelect()
	const course: getOneCourseType = await getOneCourse(id)

	return (
		<ServerPageCard title={"edit project"} description={"edit project in the database."} href={"/server/courses"}>
			<EditCourseForm allInstructors={allInstructors} course={course} />
		</ServerPageCard>
	)
}
