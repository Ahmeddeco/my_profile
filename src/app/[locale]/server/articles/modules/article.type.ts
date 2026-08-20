import { getAllArticlesForArticlesPage, getOneArticle, getOneArticleBySlug, } from "@/app/[locale]/server/articles/modules/article.data"

export type getAllArticlesForArticlesPageType = Awaited<ReturnType<typeof getAllArticlesForArticlesPage>>
export type getOneArticleType = Awaited<ReturnType<typeof getOneArticle>>
export type getOneArticleBySlugType = Awaited<ReturnType<typeof getOneArticleBySlug>>
export type singleArticlePageType = NonNullable<getAllArticlesForArticlesPageType>["data"][number]