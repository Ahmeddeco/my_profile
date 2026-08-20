import { ImageOff, PlusCircle } from "lucide-react"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { Role } from "@/generated/prisma/enums"
import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { dateFormate } from "@/helpers/dateFormate"
import ServerPageCard from "@/components/server/ServerPageCard"
import Settings from "@/components/server/Settings"
import PaginationSection from "@/components/server/Pagination"
import { deleteArticlesAction } from "@/app/[locale]/server/articles/modules/article.action"
import { getAllArticlesForArticlesPageType } from "@/app/[locale]/server/articles/modules/article.type"
import { getAllArticlesForArticlesPage } from "@/app/[locale]/server/articles/modules/article.data"
import { connection } from "next/server"

export default async function ArticlesPage({
	searchParams,
	params,
}: {
	searchParams: Promise<{ page: string; size: string }>
	params: Promise<{ locale: "en" | "ar" }>
}) {
	await connection()
	await isAllowedRoles([Role.admin])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const articles: getAllArticlesForArticlesPageType = await getAllArticlesForArticlesPage(pageSize, pageNumber)
	const locale = (await params).locale

	return (
		<ServerPageCard
			btnTitle="add article"
			icon={PlusCircle}
			title={"all articles"}
			description={"All articles in the database."}
			href={"/server/articles/add"}
		>
			{!articles?.data.length ? (
				<EmptyCard href={"/server/articles/add"} linkTitle={"add article"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>Image</TableHead>
							<TableHead>title</TableHead>
							<TableHead>author</TableHead>
							<TableHead>created At</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{articles.data.map(({ id, mainImage, titleAr, createdAt, titleEn, author }) => (
							<TableRow key={id}>
								<TableCell>
									{mainImage ? (
										<Image
											src={mainImage}
											alt={titleAr}
											width={48}
											height={48}
											className=" object-cover aspect-square rounded-lg"
										/>
									) : (
										<ImageOff size={48} />
									)}
								</TableCell>
								<TableCell>{locale === "en" ? titleEn : titleAr}</TableCell>
								<TableCell>
									<Item size={"xs"} className="px-0">
										<ItemMedia variant="image">
											{author.image ? (
												<Image src={author.image} alt={author.name} width={48} height={48} />
											) : (
												<ImageOff />
											)}
										</ItemMedia>
										<ItemContent>
											<ItemTitle>{author.name}</ItemTitle>
										</ItemContent>
									</Item>
								</TableCell>
								<TableCell>{dateFormate(createdAt)}</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<Settings
									id={id}
									deleteAction={deleteArticlesAction}
									editLink={`/server/articles/edit/${id}`}
									deleteName={"article"}
								/>
							</TableRow>
						))}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<TableCaption>
						<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={articles.totalPages} />
					</TableCaption>
				</Table>
			)}
		</ServerPageCard>
	)
}
