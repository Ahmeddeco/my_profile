import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"

export default async function ServerPage() {
	await connection()
	await isAllowedRoles([Role.admin])

	return <h1>Welcome to Serverpage!</h1>
}
