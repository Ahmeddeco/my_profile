import { CircleChevronLeft } from "lucide-react"
import ServerPageCard from "@/components/server/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import EditUser from "@/app/[locale]/server/users/modules/forms/EditUser"
import { Role } from "@/generated/prisma/enums"
import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import { getOneUser } from "@/app/[locale]/server/users/modules/users.data"
import { connection } from "next/server"

export default async function EditClassPage({ params }: { params: Promise<{ id: string }> }) {
	await connection()
	await isAllowedRoles([Role.admin])

	const id = (await params).id
	const user = await getOneUser(id)

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit style"}
			description={"edit a style to the database."}
			btnTitle={"back"}
			href="/server/users"
		>
			{!user ? <EmptyCard href={"/server/users"} linkTitle={"no user found"} /> : <EditUser user={user} />}
		</ServerPageCard>
	)
}
