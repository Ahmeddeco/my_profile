import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import AddUser from "@/forms/AddUser"
import { Role } from "@/generated/prisma/enums"

export default async function AddColorPage() {
	await isAllowedRoles([Role.admin])

	return (
		<ServerPageCard title={"Add user"} description={"Add a user to the database."} href="/server/users" btnTitle={""}>
			<AddUser />
		</ServerPageCard>
	)
}
