import { redirect } from "next/navigation"
import { getSession } from "./getSession"
import { Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"

export const isAllowedRoles = async (allowedRoles: Role[]) => {
  const session = await getSession()
  const superAdminEmail = process.env.SUPER_ADMIN

  if (!session?.user) {
    redirect("/login")
  }

  if (superAdminEmail && session.user.email === superAdminEmail) {
    return
  }

  const dbUser = await prisma.user.findUniqueOrThrow({ where: { email: session.user.email } })
  const dbUserRole = dbUser?.role ?? "user"
  if (!allowedRoles.includes(dbUserRole)) {
    redirect("/login")
  }
  return
}