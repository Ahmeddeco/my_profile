import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getOneArticle } from "@/dl/article.data"
import { getAllAdmins } from "@/dl/users.data"
import EditArticle from "@/forms/EditArticle"
import { Role } from "@/generated/prisma/enums"
import { getOneArticleType } from "@/types/article.type"
import { getAllAdminsType } from "@/types/user.type"

type Props = {
	params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: Props) {
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
