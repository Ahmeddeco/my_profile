import PaginationSection from "@/components/backend/Pagination"
import ArticleCard from "@/components/pages/articles/ArticleCard"
import { getAllArticlesForArticlesPage } from "@/dl/article.data"
import { getDictionary } from "@/locales/dictionaries"
import { getAllArticlesForArticlesPageType } from "@/types/article.type"

type Props = {
	params: Promise<{ locale: "en" | "ar" }>
	searchParams: Promise<{ page: string; size: string }>
}

export default async function ArticlesPage({ params, searchParams }: Props) {
	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 9
	const articles: getAllArticlesForArticlesPageType = await getAllArticlesForArticlesPage(pageSize, pageNumber)
	const locale = (await params).locale
	const dic = await getDictionary(locale)

	return (
		<section className="flex flex-col items-center justify-center gap-6">
			<div className="flex flex-col items-center justify-center gap-2 w-full">
				<h1>
					{dic.projectsPage.title} <span className="text-primary">{dic.projectsPage.titleSpan}</span>
				</h1>
				<h6 className="text-center max-w-md">{dic.projectsPage.subTitle}</h6>
				<h4 className="text-center max-w-md capitalize self-start">
					{locale === "en" ? "total Articles:" : "عدد المقالات:"}{" "}
					<span className="text-primary font-black text-2xl">{articles?.totalArticles}</span>
				</h4>
			</div>

			{/* --------------------------- project cards -------------------------- */}
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center  gap-6 w-full">
				{articles?.data.map((article) => (
					<ArticleCard article={article} key={article.id} locale={locale} />
				))}
			</div>

			{/* ---------------------------- Pagination ---------------------------- */}
			<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={articles?.totalPages ?? 0} />
		</section>
	)
}
