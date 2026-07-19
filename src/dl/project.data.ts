import prisma from "@/lib/prisma"

/* ----------------------- getAllProjectsForServerPage ---------------------- */
export const getAllProjectsForServerPage = async (size: number, page: number) => {
  try {
    const totalColors = await prisma.project.count()
    const totalPages = Math.ceil(totalColors / size)
    const data = await prisma.project.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: { createdAt: "desc" },
      select: { titleAr: true, titleEn: true, id: true, createdAt: true, mainImage: true, type: true, client: { select: { name: true, image: true, id: true } } }
    })
    return { data, totalPages }

  } catch (error) {
    console.error(error)

  }
}

/* ----------------------------- getAllProjects ----------------------------- */
export const getAllProjects = async (size: number, page: number) => {
  try {
    const totalColors = await prisma.project.count()
    const totalPages = Math.ceil(totalColors / size)
    const data = await prisma.project.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: { createdAt: "desc" },
      include: { client: true }
    })
    return { data, totalPages }

  } catch (error) {
    console.error(error)

  }
}

/* ------------------------------ getOneProject ----------------------------- */
export const getOneProject = async (id: string) => {
  try {
    return await prisma.project.findUniqueOrThrow({ where: { id }, include: { client: true } })
  } catch (error) {
    console.error(error)
  }
}