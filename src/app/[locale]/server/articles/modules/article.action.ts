"use server"

import prisma from "@/lib/prisma"
import { splittedItems } from "@/helpers/splittedItems"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"
import { refresh, updateTag } from "next/cache"
import ArticleSchema from "@/app/[locale]/server/articles/modules/article.schema"
import { DeleteActionState } from "@/components/server/Settings"

/* ----------------------------- addArticleAction ----------------------------- */
export const addArticleAction = async (prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: ArticleSchema
	})
	if (submission.status !== "success") {
		return submission.reply()
	}
	const splittedImagesData = splittedItems(submission.value.images!.join(","))

	try {
		await prisma.article.upsert({
			where: { slug: submission.value.slug! },
			create: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				slug: submission.value.slug,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				userId: submission.value.userId,
				topicAr: submission.value.topicAr,
				topicEn: submission.value.topicEn,
				createdAt: submission.value.createdAt,
				mainImage: submission.value.mainImage,
				images: splittedImagesData,
			},
			update: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				slug: submission.value.slug,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				userId: submission.value.userId,
				topicAr: submission.value.topicAr,
				topicEn: submission.value.topicEn,
				createdAt: submission.value.createdAt,
				mainImage: submission.value.mainImage,
				images: splittedImagesData,
			}
		})
	} catch (error) {
		console.error(error)
		return submission.reply({
			formErrors: ["فشل اضافة البيانات، تأكد من أن المعرف صحيح"]
		})
	}
	updateTag("articles")
	redirect("/server/articles")
}

/* ----------------------------- editArticleAction ---------------------------- */
export const editArticleAction = async (prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: ArticleSchema
	})
	if (submission.status !== "success") {
		return submission.reply()
	}
	const splittedImagesData = splittedItems(submission.value.images!.join(","))

	try {
		await prisma.article.update({
			where: { id: submission.value.id! },
			data: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				slug: submission.value.slug,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				userId: submission.value.userId,
				topicAr: submission.value.topicAr,
				topicEn: submission.value.topicEn,
				createdAt: submission.value.createdAt,
				mainImage: submission.value.mainImage,
				images: splittedImagesData,
			}
		})
	} catch (error) {
		console.error(error)
		return submission.reply({
			formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"]
		})
	}
	updateTag("articles")
	redirect("/server/articles")
}

/* ---------------------------- deleteArticlesAction --------------------------- */
export const deleteArticlesAction = async (
	_prevState: DeleteActionState,
	formData: FormData
): Promise<DeleteActionState> => {
	const id = formData.get("id") as string

	if (!id) {
		return { success: false, error: "Article ID not found" }
	}

	try {
		await prisma.article.delete({
			where: { id },
		})
	} catch (error) {
		console.error("Delete Action Error:", error)
		return { success: false, error: "An error occurred during the deletion Article." }
	}

	updateTag("articles")
	refresh()
	return { success: true, error: null }
}