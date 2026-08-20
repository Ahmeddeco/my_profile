import { ImageOff, PlusCircle } from "lucide-react"
import ServerPageCard from "@/components/backend/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { deleteUserAction } from "@/app/[locale]/server/users/modules/user.action"
import { Role } from "@/generated/prisma/enums"
import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import { getAllUsers } from "@/app/[locale]/server/users/modules/users.data"
import Settings from "@/components/backend/Settings"
import PaginationSection from "@/components/backend/Pagination"
import { connection } from "next/server"

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
							<TableHead>image</TableHead>
							<TableHead>name</TableHead>
							<TableHead>role</TableHead>
							<TableHead>mobile</TableHead>
							<TableHead>address</TableHead>
							<TableHead className="text-left">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{users.data.map(({ id, mobile, name, role, city, country, state, image }) => (
							<TableRow key={id}>
								<TableCell>
									{image ? (
										<Image
											src={image}
											alt={name ?? "user"}
											width={48}
											height={48}
											className="rounded-lg object-cover aspect-square"
										/>
									) : (
										<ImageOff size={48} />
									)}
								</TableCell>
								<TableCell className="capitalize ">{name}</TableCell>
								<TableCell className="capitalize ">{role}</TableCell>
								<TableCell>{mobile}</TableCell>
								<TableCell>
									{country} - {state} - {city}{" "}
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
