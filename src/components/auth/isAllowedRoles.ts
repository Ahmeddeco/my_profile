import { redirect } from "next/navigation"
import { getSession } from "./getSession"
import { Role } from "@/generated/prisma/enums"

export const isAllowedRoles = async (allowedRoles: Role[]) => {
  const session = await getSession()

  // 1. إذا لم يكن هناك جلسة تسجيل دخول أصلاً
  if (!session?.user) {
    redirect("/login") // أو التوجيه للرئيسية "/"
  }

  const superAdminEmail = process.env.SUPER_ADMIN

  // 2. السماح الفوري للـ Super Admin
  if (superAdminEmail && session.user.email === superAdminEmail) {
    return session
  }

  // 3. التحقق من مطابقة الدور الحالي للمستخدم للأدوار المسموحة
  const userRole = session.user.role as Role
  if (!allowedRoles.includes(userRole)) {
    redirect("/login")
  }

  return session
}