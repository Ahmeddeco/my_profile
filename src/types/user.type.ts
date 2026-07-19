import { getAllClients, getOneUser } from "@/dl/users.data"

export type getAllClientsType = Awaited<ReturnType<typeof getAllClients>>
export type getOneUserType = Awaited<ReturnType<typeof getOneUser>>