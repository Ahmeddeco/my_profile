import { getAllAcademiesForSelect, getAllBranchesForPage, getOneBranch } from "@/app/[locale]/server/courses/branches/modules/branch.data"

export type getAllAcademiesForSelectType = Awaited<ReturnType<typeof getAllAcademiesForSelect>>
export type getAllBranchesForPageType = Awaited<ReturnType<typeof getAllBranchesForPage>>
export type getOneBranchType = Awaited<ReturnType<typeof getOneBranch>>