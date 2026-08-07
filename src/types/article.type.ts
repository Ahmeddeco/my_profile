import { getAllArticlesForArticlesPage, getOneArticle, } from "@/dl/article.data"

export type getAllArticlesForArticlesPageType = Awaited<ReturnType<typeof getAllArticlesForArticlesPage>>
export type getOneArticleType = Awaited<ReturnType<typeof getOneArticle>>
export type OneArticleCard = NonNullable<getAllArticlesForArticlesPageType>["data"][number]