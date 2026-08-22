"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------- getAllCoursesForSelect ----------------------- */
export const getAllCoursesForSelect = async () => {
  try {
    cacheLife("days")
    cacheTag('courses')
    return await prisma.course.findMany({
      select: { id: true, titleEn: true, titleAr: true, mainImage: true }
    })
  } catch (error) {
    console.error(error)
  }
}

/* ----------------------- getAllBranchesForSelect ----------------------- */
export const getAllBranchesForSelect = async () => {
  try {
    cacheLife("days")
    cacheTag('branches')
    return await prisma.branch.findMany({
      select: { id: true, name: true, academy: { select: { id: true, name: true, logo: true } } }
    })
  } catch (error) {
    console.error(error)
  }
}

/* -------------------------- getAllGroupsForPage -------------------------- */
export const getAllGroupsForPage = async (size: number, page: number) => {
  try {
    cacheLife("days")
    cacheTag('groups')
    const totalGroups = await prisma.group.count()
    const totalPages = Math.ceil(totalGroups / size)
    const data = await prisma.group.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, title: true, status: true, code: true, capacity: true, price: true, startAt: true, endAt: true,
        course: { select: { id: true, mainImage: true, titleAr: true, titleEn: true, price: true } },
        branch: { select: { id: true, name: true, academy: { select: { id: true, name: true, logo: true } } } }
      }
    })
    return { data, totalPages, totalGroups }

  } catch (error) {
    console.error(error)

  }
}


/* ------------------------------ getOneGroup ------------------------------ */
export const getOneGroup = async (id: string) => {
  cacheLife("days")
  cacheTag(`groups`)
  try {
    return await prisma.group.findUniqueOrThrow({
      where: { id },
      include: {
        branch: { select: { id: true, name: true } },
        course: { select: { id: true, titleEn: true, titleAr: true, mainImage: true, price: true } }
      }
    })
  } catch (error) {
    console.error(error)
  }
}