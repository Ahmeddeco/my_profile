'use server'

import { DeleteActionState } from "@/components/backend/Settings"
import prisma from "@/lib/prisma"
import { splittedImages } from "@/logic/splittedImages"
import ProjectSchema from "@/app/[locale]/server/projects/modules/project.schema"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addProjectAction ----------------------------- */
export const addProjectAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ProjectSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  const splitImages = splittedImages(submission.value.images[0])

  try {
    await prisma.project.upsert({
      where: { slug: submission.value.slug! },
      create: {
        titleAr: submission.value.titleAr,
        titleEn: submission.value.titleEn,
        descriptionAr: submission.value.descriptionAr,
        descriptionEn: submission.value.descriptionEn,
        miniDescriptionAr: submission.value.miniDescriptionAr,
        miniDescriptionEn: submission.value.miniDescriptionEn,
        mainImage: submission.value.mainImage,
        images: splitImages,
        url: submission.value.url,
        createdAt: submission.value.createdAt,
        type: submission.value.type,
        userId: submission.value.userId,
        slug: submission.value.slug!,
      },
      update: {
        titleAr: submission.value.titleAr,
        titleEn: submission.value.titleEn,
        descriptionAr: submission.value.descriptionAr,
        descriptionEn: submission.value.descriptionEn,
        miniDescriptionAr: submission.value.miniDescriptionAr,
        miniDescriptionEn: submission.value.miniDescriptionEn,
        mainImage: submission.value.mainImage,
        images: splitImages,
        url: submission.value.url,
        createdAt: submission.value.createdAt,
        type: submission.value.type,
        userId: submission.value.userId,
        slug: submission.value.slug!,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Server Error"],
    })
  }
  updateTag("projects")
  redirect("/server/projects")
}

/* ----------------------------- editProjectAction ---------------------------- */
export const editProjectAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ProjectSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  const splitImages = splittedImages(submission.value.images[0])

  try {
    await prisma.project.update({
      where: {
        slug: submission.value.slug!,
      },
      data: {
        titleAr: submission.value.titleAr,
        titleEn: submission.value.titleEn,
        descriptionAr: submission.value.descriptionAr,
        descriptionEn: submission.value.descriptionEn,
        miniDescriptionAr: submission.value.miniDescriptionAr,
        miniDescriptionEn: submission.value.miniDescriptionEn,
        mainImage: submission.value.mainImage,
        images: splitImages,
        url: submission.value.url,
        createdAt: submission.value.createdAt,
        type: submission.value.type,
        userId: submission.value.userId,
        slug: submission.value.slug!,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"],
    })
  }
  updateTag("projects")
  redirect("/server/projects")
}

/* ---------------------------- deleteProjectAction --------------------------- */
export const deleteProjectAction = async (
  _prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> => {
  const id = formData.get("id") as string

  if (!id) {
    return { success: false, error: "project ID not found" }
  }

  try {
    await prisma.project.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Delete Action Error:", error)
    return { success: false, error: "An error occurred during the deletion project." }
  }

  updateTag("projects")
  refresh()
  return { success: true, error: null }
}