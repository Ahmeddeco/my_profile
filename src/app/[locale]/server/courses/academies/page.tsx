import { ImageOff, PlusCircle } from "lucide-react"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { Role } from "@/generated/prisma/enums"
import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import { Badge } from "@/components/ui/badge"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { dateFormate } from "@/helpers/dateFormate"
import ServerPageCard from "@/components/server/ServerPageCard"
import Settings from "@/components/server/Settings"
import PaginationSection from "@/components/server/Pagination"
import { connection } from "next/server"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAllAcademiesForPageType } from "@/app/[locale]/server/courses/academies/modules/academy.type"
import { getAllAcademiesForPage } from "@/app/[locale]/server/courses/academies/modules/academy.data"
import { deleteAcademyAction } from "@/app/[locale]/server/courses/academies/modules/academy.action"

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ page: string; size: string }> }) {
	await connection()
	await isAllowedRoles([Role.admin, Role.instructor])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const academies: getAllAcademiesForPageType = await getAllAcademiesForPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add academy"
			icon={PlusCircle}
			title={"all academies"}
			description={"All academies in the database."}
			href={"/server/courses/academies/add"}
		>
			{!academies?.data.length ? (
				<EmptyCard href={"/server/courses/academies/add"} linkTitle={"add academy"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>Image</TableHead>
							<TableHead>name</TableHead>
							<TableHead>owner</TableHead>
							<TableHead>tel</TableHead>
							<TableHead>created At</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{academies.data.map(({ createdAt, id, logo, name, owner, tel }) => (
							<TableRow key={id}>
								<TableCell>
									{logo ? (
										<Image
											src={logo}
											alt={"logo"}
											width={48}
											height={48}
											className=" object-cover aspect-square rounded-lg"
										/>
									) : (
										<ImageOff size={48} />
									)}
								</TableCell>
								<TableCell>{name}</TableCell>

								<TableCell>
									<Item size={"xs"} className="px-0">
										<ItemMedia variant={"icon"}>
											<Avatar>
												<AvatarImage src={owner?.image ?? ""} />
												<AvatarFallback>{owner?.name[0]}</AvatarFallback>
											</Avatar>
										</ItemMedia>
										<ItemContent>
											<ItemTitle>{owner?.name}</ItemTitle>
										</ItemContent>
									</Item>
								</TableCell>
								<TableCell>
									<Badge variant={"outline"}>{tel}</Badge>
								</TableCell>
								<TableCell>{dateFormate(createdAt)}</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<Settings
									id={id}
									deleteAction={deleteAcademyAction}
									editLink={`/server/courses/academies/edit/${id}`}
									deleteName={"Academy"}
								/>
							</TableRow>
						))}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<TableCaption>
						<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={academies.totalPages} />
					</TableCaption>
				</Table>
			)}
		</ServerPageCard>
	)
}
