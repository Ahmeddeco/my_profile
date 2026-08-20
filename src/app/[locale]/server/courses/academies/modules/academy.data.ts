"use cache"

import { Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------- getAllOwnersForSelect ----------------------- */
export const getAllOwnersForSelect = async () => {
  try {
    cacheLife("hours")
    cacheTag('users')
    return await prisma.user.findMany({
      where: { role: { in: [Role.instructor, Role.admin, Role.owner] } },
      select: { name: true, id: true, image: true }
    })
  } catch (error) {
    console.error(error)
  }
}

/* -------------------------- getAllAcademiesForPage -------------------------- */
export const getAllAcademiesForPage = async (size: number, page: number) => {
  try {
    cacheLife("days")
    cacheTag('academies')
    const totalAcademies = await prisma.academy.count()
    const totalPages = Math.ceil(totalAcademies / size)
    const data = await prisma.academy.findMany({
      skip: (page * size) - size,
      take: size,
      include: { owner: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: "desc" },
    })
    return { data, totalPages, totalAcademies }

  } catch (error) {
    console.error(error)

  }
}

/* ------------------------------ getOneAcademy ------------------------------ */
export const getOneAcademy = async (id: string) => {
  cacheLife("days")
  cacheTag(`academies`)
  try {
    return await prisma.academy.findUniqueOrThrow({
      where: { id },
      include: { owner: { select: { id: true, name: true, image: true } } }
    })
  } catch (error) {
    console.error(error)
  }
}