import { getAllAdmins, getAllClients, getOneUser } from "@/app/[locale]/server/users/modules/users.data"

export type getAllClientsType = Awaited<ReturnType<typeof getAllClients>>
export type getOneUserType = Awaited<ReturnType<typeof getOneUser>>
export type getAllAdminsType = Awaited<ReturnType<typeof getAllAdmins>>