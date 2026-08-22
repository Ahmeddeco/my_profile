import { NavigationOff, PhoneOff, PlusCircle } from "lucide-react"
import ServerPageCard from "@/components/server/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deleteUserAction } from "@/app/[locale]/server/users/modules/user.action"
import { Role } from "@/generated/prisma/enums"
import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import { getAllUsers } from "@/app/[locale]/server/users/modules/users.data"
import Settings from "@/components/server/Settings"
import PaginationSection from "@/components/server/Pagination"
import { connection } from "next/server"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default async function StylesPage({ searchParams }: { searchParams: Promise<{ page: string; size: string }> }) {
	await connection()
	await isAllowedRoles([Role.admin])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const users = await getAllUsers(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add user"
			icon={PlusCircle}
			title={"all users"}
			description={"All users in the database."}
			href={"/server/users/add"}
		>
			{!users?.data.length ? (
				<EmptyCard href={"/server/users/add"} linkTitle={"add user"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>user</TableHead>
							<TableHead>role</TableHead>
							<TableHead>mobile</TableHead>
							<TableHead>address</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{users.data.map(({ id, mobile, name, role, city, country, state, image }) => (
							<TableRow key={id}>
								<TableCell>
									<Item size={"default"} className="px-0">
										<ItemMedia variant={"icon"}>
											<Avatar size="lg">
												<AvatarImage src={image ?? ""} />
												<AvatarFallback>{name[0]}</AvatarFallback>
											</Avatar>
										</ItemMedia>
										<ItemContent>
											<ItemTitle>{name}</ItemTitle>
										</ItemContent>
									</Item>
								</TableCell>
								<TableCell>
									<Badge>{role}</Badge>
								</TableCell>
								<TableCell>{mobile ? <Badge variant={"outline"}>{mobile}</Badge> : <PhoneOff />}</TableCell>
								<TableCell>
									{!country && !state && !city ? <NavigationOff /> : `${country ?? ""}  ${state ?? ""}  ${city ?? ""}`}
								</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<Settings
									id={id}
									deleteAction={deleteUserAction}
									editLink={`/server/users/edit/${id}`}
									deleteName={"service"}
								/>
							</TableRow>
						))}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<TableCaption>
						<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={users.totalPages} />
					</TableCaption>
				</Table>
			)}
		</ServerPageCard>
	)
}
