import { CalendarOff, PlusCircle } from "lucide-react"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Role } from "@/generated/prisma/enums"
import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import { Badge } from "@/components/ui/badge"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import ServerPageCard from "@/components/server/ServerPageCard"
import Settings from "@/components/server/Settings"
import PaginationSection from "@/components/server/Pagination"
import { connection } from "next/server"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAllGroupsForPage } from "@/app/[locale]/server/courses/groups/modules/group.data"
import { getAllGroupsForPageType } from "@/app/[locale]/server/courses/groups/modules/group.type"
import { deleteGroupAction } from "@/app/[locale]/server/courses/groups/modules/group.action"
import { fnsDateFormat } from "@/helpers/fnsDateFormat"
import { Currency } from "@/helpers/currency"

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ page: string; size: string }> }) {
	await connection()
	await isAllowedRoles([Role.admin, Role.instructor])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const groups: getAllGroupsForPageType = await getAllGroupsForPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add group"
			icon={PlusCircle}
			title={"all groups"}
			description={"All groups in the database."}
			href={"/server/courses/groups/add"}
		>
			{!groups?.data.length ? (
				<EmptyCard href={"/server/courses/groups/add"} linkTitle={"add group"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>course</TableHead>
							<TableHead>branch</TableHead>
							<TableHead>code</TableHead>
							<TableHead>capacity</TableHead>
							<TableHead>start At</TableHead>
							<TableHead>end At</TableHead>
							<TableHead>price</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{groups.data.map(({ branch, capacity, code, course, endAt, id, price, startAt }) => (
							<TableRow key={id}>
								<TableCell>
									<Item size={"default"} className="px-0">
										<ItemMedia variant={"image"}>
											<Avatar size="lg">
												<AvatarImage src={course.mainImage ?? ""} />
												<AvatarFallback>{course.titleEn[0]}</AvatarFallback>
											</Avatar>
										</ItemMedia>
										<ItemContent>
											<ItemTitle>{course.titleEn}</ItemTitle>
										</ItemContent>
									</Item>
								</TableCell>
								<TableCell>
									<Item size={"xs"} className="px-0">
										<ItemMedia variant={"icon"}>
											<Avatar size="sm">
												<AvatarImage src={branch.academy.logo ?? ""} />
												<AvatarFallback>{branch.academy.name[0]}</AvatarFallback>
											</Avatar>
										</ItemMedia>
										<ItemContent>
											<ItemTitle>{branch.name}</ItemTitle>
										</ItemContent>
									</Item>
								</TableCell>
								<TableCell>
									<Badge>{code}</Badge>
								</TableCell>
								<TableCell>{capacity}</TableCell>
								<TableCell>{fnsDateFormat(startAt)}</TableCell>
								<TableCell>{endAt ? fnsDateFormat(endAt) : <CalendarOff />}</TableCell>
								<TableCell>{Currency(price ?? course.price, "en")}</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<Settings
									id={id}
									deleteAction={deleteGroupAction}
									editLink={`/server/courses/groups/edit/${id}`}
									deleteName={"group"}
								/>
							</TableRow>
						))}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<TableCaption>
						<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={groups.totalPages} />
					</TableCaption>
				</Table>
			)}
		</ServerPageCard>
	)
}
