import { getAllAcademiesForPage, getAllOwnersForSelect, getOneAcademy } from "@/app/[locale]/server/courses/academies/modules/academy.data"

export type getAllOwnersForSelectType = Awaited<ReturnType<typeof getAllOwnersForSelect>>
export type getOneAcademyType = Awaited<ReturnType<typeof getOneAcademy>>
export type getAllAcademiesForPageType = Awaited<ReturnType<typeof getAllAcademiesForPage>>