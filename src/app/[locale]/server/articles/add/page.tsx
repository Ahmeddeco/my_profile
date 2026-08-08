import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getAllAdmins } from "@/dl/users.data"
import AddArticle from "@/forms/AddArticle"
import { Role } from "@/generated/prisma/enums"
import { getAllAdminsType } from "@/types/user.type"
import { connection } from "next/server"

export default async function AddArticlePage() {
	await connection()

	await isAllowedRoles([Role.admin])
	const authors: getAllAdminsType = await getAllAdmins()

	return (
		<ServerPageCard title={"Add article"} description={"Add a article to the database."} href="/server/articles">
			<AddArticle authors={authors} />
		</ServerPageCard>
	)
}
