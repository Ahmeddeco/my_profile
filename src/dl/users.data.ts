import prisma from "@/lib/prisma"

/* ----------------------------- getAllUsers ---------------------------- */
export const getAllUsers = async (size: number, page: number) => {
  try {
    const totalColors = await prisma.user.count()
    const totalPages = Math.ceil(totalColors / size)
    const data = await prisma.user.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: {
        name: "asc",
      },
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------------- getOneUser ------------------------------ */
export const getOneUser = async (id: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return { data }
  } catch (error) {
    console.error(error)
  }
}

/* ----------------------- getAllUsersForFactoriesPage ---------------------- */
export const getAllUsersForFactoriesPage = async () => {
  try {
    const data = await prisma.user.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}