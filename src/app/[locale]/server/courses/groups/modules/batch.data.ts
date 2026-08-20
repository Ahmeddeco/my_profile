"use cache"

import { Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------- getAllInstructorsForSelect ----------------------- */
export const getAllInstructorsForSelect = async () => {
  try {
    cacheLife("hours")
    cacheTag('instructors')
    return await prisma.user.findMany({
      where: { role: { in: [Role.instructor, Role.admin] } },
      select: { name: true, id: true, image: true }
    })
  } catch (error) {
    console.error(error)
  }
}

/* -------------------------- getAllCoursesForPage -------------------------- */
export const getAllCoursesForPage = async (size: number, page: number) => {
  try {
    cacheLife("days")
    cacheTag('courses')
    const totalCourses = await prisma.course.count()
    const totalPages = Math.ceil(totalCourses / size)
    const data = await prisma.course.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: { createdAt: "desc" },
      select: { titleAr: true, titleEn: true, id: true, field: true, createdAt: true, mainImage: true, instructor: { select: { name: true, image: true, id: true } } }
    })
    return { data, totalPages, totalCourses }

  } catch (error) {
    console.error(error)

  }
}


/* ------------------------------ getOneCourse ------------------------------ */
export const getOneCourse = async (id: string) => {
  cacheLife("days")
  cacheTag(`courses-${id}`)
  try {
    return await prisma.course.findUniqueOrThrow({
      where: { id },
      include: { instructor: { select: { id: true, name: true, image: true } } }
    })
  } catch (error) {
    console.error(error)
  }
}