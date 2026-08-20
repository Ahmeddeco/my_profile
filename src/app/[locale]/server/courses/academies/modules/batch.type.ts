import { getAllCoursesForPage, getAllInstructorsForSelect, getOneCourse } from "@/app/[locale]/server/courses/(courses)/modules/course.data"

export type getOneCourseType = Awaited<ReturnType<typeof getOneCourse>>