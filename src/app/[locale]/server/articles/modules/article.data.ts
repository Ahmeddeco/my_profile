"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* -------------------- getAllArticlesForArticlesPage -------------------- */
export const getAllArticlesForArticlesPage = async (size: number, page: number) => {
  cacheLife("days")
  cacheTag('articles')

  try {
    const totalArticles = await prisma.article.count()
    const totalPages = Math.ceil(totalArticles / size)
    const data = await prisma.article.findMany({
      select: {
        titleEn: true, titleAr: true, id: true, slug: true, createdAt: true, mainImage: true,
        author: { select: { id: true, name: true, image: true } }
      },
      skip: (page * size) - size,
      take: size,
      orderBy: { createdAt: "desc" },
    })
    return { data, totalPages, totalArticles }
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------------ getOneArticle ----------------------------- */
export const getOneArticle = async (id: string) => {
  cacheLife("days")
  cacheTag(`articles-${id}`)

  try {
    return await prisma.article.findUnique({
      where: { id },
      include: {
        author: { select: { name: true, image: true, id: true } }
      },
    })
  } catch (error) {
    console.error(error)
  }
}
/* ------------------------------ getOneArticleBySlug ----------------------------- */
export const getOneArticleBySlug = async (slug: string) => {
  cacheLife("days")
  cacheTag(`articles-${slug}`)

  try {
    return await prisma.article.findUnique({
      where: { slug },
      include: {
        author: { select: { name: true, image: true, id: true } }
      },
    })
  } catch (error) {
    console.error(error)
  }
}

