import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/server/ServerPageCard"
import AddUser from "@/app/[locale]/server/users/modules/forms/AddUser"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"

export default async function AddColorPage() {
	await connection()
	await isAllowedRoles([Role.admin])

	return (
		<ServerPageCard title={"Add user"} description={"Add a user to the database."} href="/server/users" btnTitle={""}>
			<AddUser />
		</ServerPageCard>
	)
}
