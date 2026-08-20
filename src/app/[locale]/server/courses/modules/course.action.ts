'use server'

import CourseSchema from "@/app/[locale]/server/courses/modules/course.schema"
import { DeleteActionState } from "@/components/backend/Settings"
import prisma from "@/lib/prisma"
import { splittedImages } from "@/logic/splittedImages"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addCourseAction ----------------------------- */
export const addCourseAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: CourseSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  let splitImages: string[] = []
  if (submission.value.images && submission.value.images.length > 0) {
    splitImages = splittedImages(submission.value.images[0])
  }

  try {
    await prisma.course.upsert({
      where: { slug: submission.value.slug! },
      create: {
        field: submission.value.field,
        titleAr: submission.value.titleAr,
        titleEn: submission.value.titleEn,
        slug: submission.value.slug,
        descriptionAr: submission.value.descriptionAr,
        descriptionEn: submission.value.descriptionEn,
        detailsAr: submission.value.detailsAr,
        detailsEn: submission.value.detailsEn,
        price: submission.value.price,
        discountAmount: submission.value.discountAmount,
        mainImage: submission.value.mainImage,
        images: splitImages,
        instructorId: submission.value.instructorId,
      },
      update: {
        field: submission.value.field,
        titleAr: submission.value.titleAr,
        titleEn: submission.value.titleEn,
        slug: submission.value.slug,
        descriptionAr: submission.value.descriptionAr,
        descriptionEn: submission.value.descriptionEn,
        detailsAr: submission.value.detailsAr,
        detailsEn: submission.value.detailsEn,
        price: submission.value.price,
        discountAmount: submission.value.discountAmount,
        mainImage: submission.value.mainImage,
        images: splitImages,
        instructorId: submission.value.instructorId,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Server Error"],
    })
  }
  updateTag("courses")
  redirect("/server/courses")
}

/* ----------------------------- editCourseAction ---------------------------- */
export const editCourseAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: CourseSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  let splitImages: string[] = []
  if (submission.value.images && submission.value.images.length > 0) {
    splitImages = splittedImages(submission.value.images[0])
  }

  try {
    await prisma.course.update({
      where: {
        id: submission.value.id!,
      },
      data: {
        field: submission.value.field,
        titleAr: submission.value.titleAr,
        titleEn: submission.value.titleEn,
        slug: submission.value.slug,
        descriptionAr: submission.value.descriptionAr,
        descriptionEn: submission.value.descriptionEn,
        detailsAr: submission.value.detailsAr,
        detailsEn: submission.value.detailsEn,
        price: submission.value.price,
        discountAmount: submission.value.discountAmount,
        mainImage: submission.value.mainImage,
        images: splitImages,
        instructorId: submission.value.instructorId,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"],
    })
  }
  updateTag("courses")
  redirect("/server/courses")
}

/* ---------------------------- deleteCourseAction --------------------------- */
export const deleteCourseAction = async (
  _prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> => {
  const id = formData.get("id") as string

  if (!id) {
    return { success: false, error: "course ID not found" }
  }

  try {
    await prisma.course.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Delete Action Error:", error)
    return { success: false, error: "An error occurred during the deletion course." }
  }

  updateTag("courses")
  refresh()
  return { success: true, error: null }
}