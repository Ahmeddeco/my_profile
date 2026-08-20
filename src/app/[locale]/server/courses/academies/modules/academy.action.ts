'use server'

import AcademySchema from "@/app/[locale]/server/courses/academies/modules/academy.schema"
import { DeleteActionState } from "@/components/server/Settings"
import prisma from "@/lib/prisma"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addAcademyAction ----------------------------- */
export const addAcademyAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: AcademySchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.academy.upsert({
      where: { slug: submission.value.slug! },
      create: {
        name: submission.value.name,
        slug: submission.value.slug,
        description: submission.value.description,
        logo: submission.value.logo,
        tel: submission.value.tel,
        userId: submission.value.userId,
      },
      update: {
        name: submission.value.name,
        slug: submission.value.slug,
        description: submission.value.description,
        logo: submission.value.logo,
        tel: submission.value.tel,
        userId: submission.value.userId,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Server Error"],
    })
  }
  updateTag("academies")
  redirect("/server/courses/academies")
}

/* ----------------------------- editAcademyAction ---------------------------- */
export const editAcademyAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: AcademySchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.academy.update({
      where: {
        id: submission.value.id!,
      },
      data: {
        name: submission.value.name,
        slug: submission.value.slug,
        description: submission.value.description,
        logo: submission.value.logo,
        tel: submission.value.tel,
        userId: submission.value.userId,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"],
    })
  }
  updateTag("academies")
  redirect("/server/courses/academies")
}

/* ---------------------------- deleteAcademyAction --------------------------- */
export const deleteAcademyAction = async (
  _prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> => {
  const id = formData.get("id") as string

  if (!id) {
    return { success: false, error: "course ID not found" }
  }

  try {
    await prisma.academy.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Delete Action Error:", error)
    return { success: false, error: "An error occurred during the deletion course." }
  }

  updateTag("academies")
  refresh()
  return { success: true, error: null }
}