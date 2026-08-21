import { MapPin, PhoneOff, PlusCircle } from "lucide-react"
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
import { getAllBranchesForPageType } from "@/app/[locale]/server/courses/branches/modules/branch.type"
import { getAllBranchesForPage } from "@/app/[locale]/server/courses/branches/modules/branch.data"
import { deleteBranchAction } from "@/app/[locale]/server/courses/branches/modules/branch.action"

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ page: string; size: string }> }) {
	await connection()
	await isAllowedRoles([Role.admin, Role.instructor])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const branches: getAllBranchesForPageType = await getAllBranchesForPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add branch"
			icon={PlusCircle}
			title={"all branches"}
			description={"All branches in the database."}
			href={"/server/courses/branches/add"}
		>
			{!branches?.data.length ? (
				<EmptyCard href={"/server/courses/branches/add"} linkTitle={"add branch"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>academy</TableHead>
							<TableHead>branch name</TableHead>
							<TableHead>branch address</TableHead>
							<TableHead>tel</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{branches.data.map(({ academy, city, country, id, name, state, tel }) => (
							<TableRow key={id}>
								<TableCell>
									<Item size={"xs"} className="px-0">
										<ItemMedia variant={"icon"}>
											<Avatar>
												<AvatarImage src={academy.logo ?? ""} />
												<AvatarFallback>{academy.name[0]}</AvatarFallback>
											</Avatar>
										</ItemMedia>
										<ItemContent>
											<ItemTitle>{academy.name}</ItemTitle>
										</ItemContent>
									</Item>
								</TableCell>
								<TableCell>{name}</TableCell>
								<TableCell>
									<Badge>
										<MapPin /> {country} - {state} - {city}
									</Badge>
								</TableCell>
								<TableCell>{tel ?? <PhoneOff />}</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<Settings
									id={id}
									deleteAction={deleteBranchAction}
									editLink={`/server/courses/branches/edit/${id}`}
									deleteName={"Branch"}
								/>
							</TableRow>
						))}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<TableCaption>
						<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={branches.totalPages} />
					</TableCaption>
				</Table>
			)}
		</ServerPageCard>
	)
}
