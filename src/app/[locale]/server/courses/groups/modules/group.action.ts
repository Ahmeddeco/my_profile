'use server'

import { DeleteActionState } from "@/components/server/Settings"
import prisma from "@/lib/prisma"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"
import GroupSchema from "@/app/[locale]/server/courses/groups/modules/group.schema"

/* ----------------------------- addCourseAction ----------------------------- */
export const addGroupAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: GroupSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.group.upsert({
      where: { slug: submission.value.slug! },
      create: {
        status: submission.value.status,
        title: submission.value.title,
        slug: submission.value.slug,
        courseId: submission.value.courseId,
        branchId: submission.value.branchId,
        startAt: submission.value.startAt,
        endAt: submission.value.endAt,
        capacity: submission.value.capacity,
        price: submission.value.price,
      },
      update: {
        status: submission.value.status,
        slug: submission.value.slug,
        title: submission.value.title,
        courseId: submission.value.courseId,
        branchId: submission.value.branchId,
        startAt: submission.value.startAt,
        endAt: submission.value.endAt,
        capacity: submission.value.capacity,
        price: submission.value.price,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Server Error"],
    })
  }
  updateTag("groups")
  redirect("/server/courses/groups")
}

/* ----------------------------- editGroupAction ---------------------------- */
export const editGroupAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: GroupSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.group.update({
      where: {
        id: submission.value.id!,
      },
      data: {
        status: submission.value.status,
        slug: submission.value.slug,
        title: submission.value.title,
        courseId: submission.value.courseId,
        branchId: submission.value.branchId,
        startAt: submission.value.startAt,
        endAt: submission.value.endAt,
        capacity: submission.value.capacity,
        price: submission.value.price,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"],
    })
  }
  updateTag("groups")
  redirect("/server/courses/groups")
}

/* ---------------------------- deleteGroupAction --------------------------- */
export const deleteGroupAction = async (
  _prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> => {
  const id = formData.get("id") as string

  if (!id) {
    return { success: false, error: "course ID not found" }
  }

  try {
    await prisma.group.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Delete Action Error:", error)
    return { success: false, error: "An error occurred during the deletion group." }
  }

  updateTag("groups")
  refresh()
  return { success: true, error: null }
}