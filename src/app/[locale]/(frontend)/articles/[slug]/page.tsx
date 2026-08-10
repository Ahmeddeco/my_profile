import ImageSlider from "@/components/shared/ImageSlider"
import { Badge } from "@/components/ui/badge"
import { getOneArticleBySlug } from "@/dl/article.data"
import { dateFormate } from "@/logic/dateFormate"
import { getOneArticleBySlugType } from "@/types/article.type"
import { Calendar1, Pen } from "lucide-react"

type Props = {
	params: Promise<{ slug: string; locale: "en" | "ar" }>
}

export default async function ArticlePage({ params }: Props) {
	const locale = (await params).locale
	const slug = (await params).slug
	const article: getOneArticleBySlugType = await getOneArticleBySlug(slug)

	return (
		<article className="flex  flex-col gap-6 pt-8 px-4 w-full max-w-6xl mx-auto">
			<div className="">
				<ImageSlider
					mainImage={article?.mainImage ?? ""}
					images={article?.images ?? []}
					alt={article?.titleEn ?? "article"}
				/>
			</div>
			<div className=" flex flex-col gap-2">
				{/* ------------------------------ title ----------------------------- */}
				<h2 className="text-primary max-w-xl">{locale === "en" ? article?.titleEn : article?.titleAr}</h2>
				{/* ------------------------- Description ------------------------ */}
				<h6 className=" max-w-xl">{locale === "en" ? article?.descriptionEn : article?.descriptionEn}</h6>
				{/* -------------------- client - type - createdAt ------------------- */}
				<div className="flex flex-wrap gap-2">
					<Badge>
						<Pen />
						{article?.author.name}
					</Badge>
					<Badge>
						<Calendar1 />
						{dateFormate(article?.createdAt ? new Date(article.createdAt) : new Date(), locale, "monthAndYear")}
					</Badge>
				</div>

				{/* --------------------------- topic -------------------------- */}
				<div
					className="prose dark:prose-invert max-w-none w-full"
					dangerouslySetInnerHTML={{
						__html: locale === "en" ? (article?.topicEn ?? "") : (article?.topicAr ?? ""),
					}}
				/>
			</div>
		</article>
	)
}
