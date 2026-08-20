import { getAllClients, getAllProjectsByCategory, getAllProjectsForServerPage, getOneProject, getOneProjectBySlug } from "@/app/[locale]/server/projects/modules/project.data"

export type getAllProjectsForServerPageType = Awaited<ReturnType<typeof getAllProjectsForServerPage>>
export type singleProductPageType = NonNullable<getAllProjectsForServerPageType>["data"][number]
export type getOneProjectType = Awaited<ReturnType<typeof getOneProject>>
export type getAllProjectsByCategoryType = Awaited<ReturnType<typeof getAllProjectsByCategory>>
export type getOneProjectBySlugType = Awaited<ReturnType<typeof getOneProjectBySlug>>
export type getAllClientsType = Awaited<ReturnType<typeof getAllClients>>
