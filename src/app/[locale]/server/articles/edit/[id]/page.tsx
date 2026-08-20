import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/server/ServerPageCard"
import { getOneArticle } from "@/app/[locale]/server/articles/modules/article.data"
import { getAllAdmins } from "@/app/[locale]/server/users/modules/users.data"
import EditArticle from "@/app/[locale]/server/articles/modules/forms/EditArticle"
import { Role } from "@/generated/prisma/enums"
import { getOneArticleType } from "@/app/[locale]/server/articles/modules/article.type"
import { getAllAdminsType } from "@/app/[locale]/server/users/modules/user.type"
import { connection } from "next/server"

type Props = {
	params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: Props) {
	await connection()

	await isAllowedRoles([Role.admin])
	const id = (await params).id
	const authors: getAllAdminsType = await getAllAdmins()
	const article: getOneArticleType = await getOneArticle(id)

	return (
		<ServerPageCard title={"edit article"} description={"edit a article to the database."} href="/server/articles">
			<EditArticle authors={authors} article={article} />
		</ServerPageCard>
	)
}
