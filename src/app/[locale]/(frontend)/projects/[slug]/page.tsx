import ImageSlider from "@/components/shared/ImageSlider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getOneProjectBySlug } from "@/app/[locale]/server/projects/modules/project.data"
import { dateFormate } from "@/logic/dateFormate"
import { getOneProjectBySlugType } from "@/app/[locale]/server/projects/modules/project.type"
import { Calendar1, ExternalLink, User } from "lucide-react"
import Link from "next/link"
import { BiCategory } from "react-icons/bi"

type Props = {
	params: Promise<{ slug: string; locale: "en" | "ar" }>
}

export default async function ProjectPage({ params }: Props) {
	const locale = (await params).locale
	const slug = (await params).slug
	const project: getOneProjectBySlugType = await getOneProjectBySlug(slug)

	return (
		<div className="flex lg:flex-row flex-col gap-6  pt-8 px-4">
			<div className="flex-1 ">
				<ImageSlider
					mainImage={project?.mainImage ?? ""}
					images={project?.images ?? []}
					alt={project?.titleEn ?? "project"}
				/>
			</div>
			<div className="flex-1 flex flex-col gap-2">
				{/* ------------------------------ title ----------------------------- */}
				<h2 className="text-primary">{locale === "en" ? project?.titleEn : project?.titleAr}</h2>
				{/* ------------------------- miniDescription ------------------------ */}
				<h6>{locale === "en" ? project?.miniDescriptionEn : project?.miniDescriptionEn}</h6>
				{/* -------------------- client - type - createdAt ------------------- */}
				<div className="flex flex-wrap gap-2">
					<Badge>
						<User />
						{project?.client.name}
					</Badge>
					<Badge>
						<BiCategory />
						{project?.type}
					</Badge>
					<Badge>
						<Calendar1 />
						{dateFormate(project?.createdAt ? new Date(project.createdAt) : new Date(), locale, "monthAndYear")}
					</Badge>
				</div>
				{/* ------------------------------- url ------------------------------ */}
				{project?.url && (
					<Button asChild className="w-fit" variant={"link"}>
						<Link href={project.url} target="_blank">
							<ExternalLink />
							{locale === "en" ? "go to the project website" : "انتقل إلى موقع المشروع الإلكتروني"}
						</Link>
					</Button>
				)}
				{/* --------------------------- description -------------------------- */}
				<div
					className="prose dark:prose-invert"
					dangerouslySetInnerHTML={{
						__html: locale === "en" ? (project?.descriptionEn ?? "") : (project?.descriptionAr ?? ""),
					}}
				/>
			</div>
		</div>
	)
}
