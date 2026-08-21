import { getAllBranchesForSelect, getAllCoursesForSelect, getAllGroupsForPage, getOneGroup } from "@/app/[locale]/server/courses/groups/modules/group.data"

export type getAllCoursesForSelectType = Awaited<ReturnType<typeof getAllCoursesForSelect>>
export type getAllBranchesForSelectType = Awaited<ReturnType<typeof getAllBranchesForSelect>>
export type getOneGroupType = Awaited<ReturnType<typeof getOneGroup>>
export type getAllGroupsForPageType = Awaited<ReturnType<typeof getAllGroupsForPage>>