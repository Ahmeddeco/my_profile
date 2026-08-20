import { getAllCoursesForPage, getAllInstructorsForSelect, getOneCourse } from "@/app/[locale]/server/courses/modules/course.data"

export type getAllInstructorsForSelectType = Awaited<ReturnType<typeof getAllInstructorsForSelect>>
export type getAllCoursesForPageType = Awaited<ReturnType<typeof getAllCoursesForPage>>
export type getOneCourseType = Awaited<ReturnType<typeof getOneCourse>>