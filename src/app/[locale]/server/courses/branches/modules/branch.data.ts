"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------- getAllAcademiesForSelect ----------------------- */
export const getAllAcademiesForSelect = async () => {
  try {
    cacheLife("days")
    cacheTag('academies')
    return await prisma.academy.findMany({
      select: { id: true, name: true, logo: true }
    })
  } catch (error) {
    console.error(error)
  }
}

/* -------------------------- getAllBranchesForPage -------------------------- */
export const getAllBranchesForPage = async (size: number, page: number) => {
  try {
    cacheLife("days")
    cacheTag('branches')
    const totalBranches = await prisma.branch.count()
    const totalPages = Math.ceil(totalBranches / size)
    const data = await prisma.branch.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: { name: "asc" },
      select: {
        city: true, country: true, id: true, name: true, state: true, tel: true,
        academy: { select: { id: true, logo: true, name: true } }
      }
    })
    return { data, totalPages, totalBranches }

  } catch (error) {
    console.error(error)

  }
}


/* ------------------------------ getOneBranch ------------------------------ */
export const getOneBranch = async (id: string) => {
  cacheLife("days")
  cacheTag(`branches`)
  try {
    return await prisma.branch.findUniqueOrThrow({
      where: { id },
      include: { academy: { select: { id: true, name: true, logo: true } } }
    })
  } catch (error) {
    console.error(error)
  }
}