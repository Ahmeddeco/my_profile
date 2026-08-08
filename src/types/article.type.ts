import { getAllArticlesForArticlesPage, getOneArticle, getOneArticleBySlug, } from "@/dl/article.data"

export type getAllArticlesForArticlesPageType = Awaited<ReturnType<typeof getAllArticlesForArticlesPage>>
export type getOneArticleType = Awaited<ReturnType<typeof getOneArticle>>
export type getOneArticleBySlugType = Awaited<ReturnType<typeof getOneArticleBySlug>>
export type singleArticlePageType = NonNullable<getAllArticlesForArticlesPageType>["data"][number]