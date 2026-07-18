import { redirect } from "next/navigation"
import { getSession } from "./getSession"
import { Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"

export const isAllowedRoles = async (isAllowedRoles: Role[]) => {
  const superAdmin = process.env.SUPPER_ADMIN
  const session = await getSession()
  const userId = session?.user.id

  if (!session && !userId) {
    redirect("/")
  }

  const role = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } })

  if (session?.user.email === superAdmin) {
    return
  }
  if (!role || !isAllowedRoles.includes(role.role)) {
    redirect("/")
  }
  return
}