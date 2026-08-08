import { getAllProjectsByCategory, getAllProjectsForServerPage, getOneProject, getOneProjectBySlug } from "@/dl/project.data"

export type getAllProjectsForServerPageType = Awaited<ReturnType<typeof getAllProjectsForServerPage>>
export type singleProductPageType = NonNullable<getAllProjectsForServerPageType>["data"][number]
export type getOneProjectType = Awaited<ReturnType<typeof getOneProject>>
export type getAllProjectsByCategoryType = Awaited<ReturnType<typeof getAllProjectsByCategory>>
export type getOneProjectBySlugType = Awaited<ReturnType<typeof getOneProjectBySlug>>