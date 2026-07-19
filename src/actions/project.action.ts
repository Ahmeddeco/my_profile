'use server'

import prisma from "@/lib/prisma"
import ProjectSchema from "@/schemas/ProjectSchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addProjectAction ----------------------------- */
export const addProjectAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ProjectSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }


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
        images: submission.value.images,
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
        images: submission.value.images,
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
        images: submission.value.images,
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
  redirect("/server/projects")
}

/* ---------------------------- deleteProjectAction --------------------------- */
export const deleteProjectAction = async (formData: FormData) => {
  const id = formData.get("id")
  try {
    await prisma.project.delete({
      where: {
        id: id as string
      }
    })
  } catch (error) {
    console.error(error)
  }
  refresh()
}