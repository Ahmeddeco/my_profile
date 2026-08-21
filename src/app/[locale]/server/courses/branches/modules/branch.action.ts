'use server'

import { DeleteActionState } from "@/components/server/Settings"
import prisma from "@/lib/prisma"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"
import BranchSchema from "@/app/[locale]/server/courses/branches/modules/branch.schema"

/* ----------------------------- addBranchAction ----------------------------- */
export const addBranchAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: BranchSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.branch.upsert({
      where: { slug: submission.value.slug! },
      create: {
        name: submission.value.name,
        slug: submission.value.slug,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        lat: submission.value.lat,
        lng: submission.value.lng,
        tel: submission.value.tel,
        academyId: submission.value.academyId,
      },
      update: {
        name: submission.value.name,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        lat: submission.value.lat,
        lng: submission.value.lng,
        tel: submission.value.tel,
        academyId: submission.value.academyId,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Server Error"],
    })
  }
  updateTag("branches")
  redirect("/server/courses/branches")
}

/* ----------------------------- editBranchAction ---------------------------- */
export const editBranchAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: BranchSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.branch.update({
      where: {
        id: submission.value.id!,
      },
      data: {
        name: submission.value.name,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        lat: submission.value.lat,
        lng: submission.value.lng,
        tel: submission.value.tel,
        academyId: submission.value.academyId,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"],
    })
  }
  updateTag("branches")
  redirect("/server/courses/branches")
}

/* ---------------------------- deleteBranchAction --------------------------- */
export const deleteBranchAction = async (
  _prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> => {
  const id = formData.get("id") as string

  if (!id) {
    return { success: false, error: "course ID not found" }
  }

  try {
    await prisma.branch.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Delete Action Error:", error)
    return { success: false, error: "An error occurred during the deletion course." }
  }

  updateTag("branches")
  refresh()
  return { success: true, error: null }
}