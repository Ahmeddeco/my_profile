'use server'

import { DeleteActionState } from "@/components/backend/Settings"
import prisma from "@/lib/prisma"
import UserSchema from "@/app/[locale]/server/users/modules/user.schema"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addUserAction ----------------------------- */
export const addUserAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: UserSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.user.upsert({
      where: { email: submission.value.email! },
      create: {
        name: submission.value.name,
        email: submission.value.email,
        mobile: submission.value.mobile,
        role: submission.value.role,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        image: submission.value.image,
      },
      update: {
        name: submission.value.name,
        email: submission.value.email,
        mobile: submission.value.mobile,
        role: submission.value.role,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        image: submission.value.image,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Server Error"],
    })
  }
  updateTag("users")
  redirect("/server/users")
}

/* ----------------------------- editUserAction ---------------------------- */
export const editUserAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: UserSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.user.update({
      where: {
        id: submission.value.id!,
      },
      data: {
        name: submission.value.name,
        email: submission.value.email,
        mobile: submission.value.mobile,
        role: submission.value.role,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        image: submission.value.image,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"],
    })
  }
  updateTag("users")
  redirect("/server/users")
}

/* ---------------------------- deleteUserAction --------------------------- */
export const deleteUserAction = async (
  _prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> => {
  const id = formData.get("id") as string

  if (!id) {
    return { success: false, error: "project ID not found" }
  }

  try {
    await prisma.user.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Delete Action Error:", error)
    return { success: false, error: "An error occurred during the deletion project." }
  }

  updateTag("users")
  refresh()
  return { success: true, error: null }
}