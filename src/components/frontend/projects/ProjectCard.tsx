import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { dateFormate } from "@/helpers/dateFormate"
import { singleProductPageType } from "@/app/[locale]/server/projects/modules/project.type"
import { Calendar1, ExternalLink, Eye, ImageOff, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Props = {
	project: singleProductPageType
	locale: "en" | "ar"
}

export default function ProjectCard({ project, locale }: Props) {
	return (
		<div className=" max-w-lg w-full rounded-xl shadow-lg bg-card flex flex-col gap-2 ">
			<div className="size-full aspect-video relative rounded-t-xl">
				{project.mainImage ? (
					<Image
						src={project.mainImage}
						alt={project.titleEn ?? "project"}
						fill
						className="object-cover rounded-t-xl"
					/>
				) : (
					<ImageOff />
				)}
			</div>

			{/* ------------------------------- Details ------------------------------- */}
			<div className="flex flex-col gap-2 p-4">
				<h4>{locale === "en" ? project.titleEn : project.titleAr}</h4>
				<div className="flex flex-wrap  gap-2">
					<Badge variant={"outline"}>
						<User2 />
						{project.client.name}
					</Badge>
					<Badge variant={"outline"}>
						<Calendar1 />
						{dateFormate(project.createdAt ? new Date(project.createdAt) : new Date(), locale, "monthAndYear")}
					</Badge>
				</div>
				{/* ------------------------------ Buttons ------------------------------- */}
				<div className="w-full flex lg:flex-row flex-col items-center justify-between gap-4 my-2">
					<Button size={"sm"} variant={"default"} asChild>
						<Link href={`/projects/${project.slug}`}>
							<Eye /> {locale === "en" ? "see details" : "شاهد التفاصيل "}
						</Link>
					</Button>
					<Button size={"sm"} variant={"link"} asChild>
						<Link href={project.url} target="_blank">
							<ExternalLink /> {locale === "en" ? "go to project" : "اذهب الى صفحة المشروع"}
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
