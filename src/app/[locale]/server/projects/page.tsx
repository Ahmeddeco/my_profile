import { ImageOff, PlusCircle } from "lucide-react"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { Role } from "@/generated/prisma/enums"
import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import { getAllProjectsForServerPageType } from "@/app/[locale]/server/projects/modules/project.type"
import { getAllProjectsForServerPage } from "@/app/[locale]/server/projects/modules/project.data"
import { deleteProjectAction } from "@/app/[locale]/server/projects/modules/project.action"
import { Badge } from "@/components/ui/badge"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { dateFormate } from "@/helpers/dateFormate"
import ServerPageCard from "@/components/server/ServerPageCard"
import Settings from "@/components/server/Settings"
import PaginationSection from "@/components/server/Pagination"
import { connection } from "next/server"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function ProjectsPage({
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
	const projects: getAllProjectsForServerPageType = await getAllProjectsForServerPage(pageSize, pageNumber)
	const locale = (await params).locale

	return (
		<ServerPageCard
			btnTitle="add project"
			icon={PlusCircle}
			title={"all projects"}
			description={"All projects in the database."}
			href={"/server/projects/add"}
		>
			{!projects?.data.length ? (
				<EmptyCard href={"/server/projects/add"} linkTitle={"add project"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>Image</TableHead>
							<TableHead>title</TableHead>
							<TableHead>type</TableHead>
							<TableHead>client</TableHead>
							<TableHead>created At</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{projects.data.map(({ id, mainImage, titleAr, client, createdAt, titleEn, type }) => (
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
									<Badge variant={"outline"}>{type}</Badge>
								</TableCell>
								<TableCell>
									<Item size={"xs"} className="px-0">
										<ItemMedia variant={"icon"}>
											<Avatar>
												<AvatarImage src={client.image ?? ""} />
												<AvatarFallback>{client.name[0]}</AvatarFallback>
											</Avatar>
										</ItemMedia>
										<ItemContent>
											<ItemTitle>{client.name}</ItemTitle>
										</ItemContent>
									</Item>
								</TableCell>
								<TableCell>{dateFormate(createdAt)}</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<Settings
									id={id}
									deleteAction={deleteProjectAction}
									editLink={`/server/projects/edit/${id}`}
									deleteName={"service"}
								/>
							</TableRow>
						))}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<TableCaption>
						<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={projects.totalPages} />
					</TableCaption>
				</Table>
			)}
		</ServerPageCard>
	)
}
