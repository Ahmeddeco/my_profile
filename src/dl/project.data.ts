"use cache"

import { ProductType } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------- getAllProjectsForServerPage ---------------------- */
export const getAllProjectsForServerPage = async (size: number, page: number) => {
  try {
    cacheLife("days")
    cacheTag('projects')
    const totalProjects = await prisma.project.count()
    const totalPages = Math.ceil(totalProjects / size)
    const data = await prisma.project.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: { createdAt: "desc" },
      select: { titleAr: true, titleEn: true, id: true, slug: true, createdAt: true, mainImage: true, type: true, url: true, client: { select: { name: true, image: true, id: true } } }
    })
    return { data, totalPages, totalProjects }

  } catch (error) {
    console.error(error)

  }
}

/* ----------------------- getAllProjectsByCategory ---------------------- */
export const getAllProjectsByCategory = async (size: number, page: number, category: ProductType) => {
  try {
    cacheLife("days")
    cacheTag(`projects-${category}`)
    const totalProjects = await prisma.project.count({ where: category ? { type: category } : {} })
    const totalPages = Math.ceil(totalProjects / size)
    const data = await prisma.project.findMany({
      where: category ? { type: category } : {},
      skip: (page * size) - size,
      take: size,
      orderBy: { createdAt: "desc" },
      select: { titleAr: true, titleEn: true, id: true, slug: true, createdAt: true, mainImage: true, type: true, url: true, client: { select: { name: true, image: true, id: true } } }
    })
    return { data, totalPages, totalProjects }

  } catch (error) {
    console.error(error)

  }
}

/* ------------------------------ getOneProject ----------------------------- */
export const getOneProject = async (id: string) => {
  cacheLife("days")
  cacheTag(`projects-${id}`)
  try {
    return await prisma.project.findUniqueOrThrow({
      where: { id },
      include: { client: { select: { id: true, name: true, image: true } } },
    })
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------------ getOneProjectBySlug ----------------------------- */
export const getOneProjectBySlug = async (slug: string) => {
  cacheLife("days")
  cacheTag(`projects-${slug}`)
  try {
    return await prisma.project.findUniqueOrThrow({
      where: { slug },
      include: { client: { select: { id: true, name: true, image: true } } },
    })
  } catch (error) {
    console.error(error)
  }
}

