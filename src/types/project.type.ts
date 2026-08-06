import { getAllProjectsForServerPage, getOneProject } from "@/dl/project.data"

export type getAllProjectsForServerPageType = Awaited<ReturnType<typeof getAllProjectsForServerPage>>
export type singleProductPageType = NonNullable<getAllProjectsForServerPageType>["data"][number]
export type getOneProjectType = Awaited<ReturnType<typeof getOneProject>>