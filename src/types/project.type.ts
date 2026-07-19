import { getAllProjectsForServerPage, getOneProject } from "@/dl/project.data"

export type getAllProjectsForServerPageType = Awaited<ReturnType<typeof getAllProjectsForServerPage>>
export type getOneProjectType = Awaited<ReturnType<typeof getOneProject>>