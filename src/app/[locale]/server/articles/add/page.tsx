import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/server/ServerPageCard"
import { getAllAdmins } from "@/app/[locale]/server/users/modules/users.data"
import AddArticle from "@/app/[locale]/server/articles/modules/forms/AddArticle"
import { Role } from "@/generated/prisma/enums"
import { getAllAdminsType } from "@/app/[locale]/server/users/modules/user.type"
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
