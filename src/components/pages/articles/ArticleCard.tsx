import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { dateFormate } from "@/logic/dateFormate"
import { singleArticlePageType } from "@/types/article.type"
import { Calendar1, Eye, ImageOff, Pen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Props = {
	article: singleArticlePageType
	locale: "en" | "ar"
}

export default function ArticleCard({ article, locale }: Props) {
	return (
		<div className=" max-w-lg w-full rounded-xl shadow-lg bg-card flex flex-col gap-2 ">
			<div className="size-full aspect-video relative rounded-t-xl">
				{article.mainImage ? (
					<Image
						src={article.mainImage}
						alt={article.titleEn ?? "article"}
						fill
						className="object-cover rounded-t-xl"
					/>
				) : (
					<ImageOff />
				)}
			</div>

			{/* ------------------------------- Details ------------------------------- */}
			<div className="flex flex-col gap-2 p-4">
				<h4>{locale === "en" ? article.titleEn : article.titleAr}</h4>
				<div className="flex flex-wrap  gap-2">
					<Badge variant={"outline"}>
						<Pen />
						{article.author.name}
					</Badge>
					<Badge variant={"outline"}>
						<Calendar1 />
						{dateFormate(article.createdAt ? new Date(article.createdAt) : new Date(), locale, "monthAndYear")}
					</Badge>
				</div>
				{/* ------------------------------ Buttons ------------------------------- */}
				<Button size={"full"} variant={"default"} asChild>
					<Link href={`/articles/${article.slug}`}>
						<Eye /> {locale === "en" ? "see article topics" : "شاهد المقال كاملا"}
					</Link>
				</Button>
			</div>
		</div>
	)
}
