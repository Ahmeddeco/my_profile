import PaginationSection from "@/components/backend/Pagination"
import ProjectCard from "@/components/pages/projects/ProjectCard"
import { getAllProjectsForServerPage } from "@/dl/project.data"
import { getDictionary } from "@/locales/dictionaries"
import { getAllProjectsForServerPageType } from "@/types/project.type"

type Props = {
	params: Promise<{ locale: "en" | "ar" }>
	searchParams: Promise<{ page: string; size: string }>
}

export default async function ProjectsPage({ params, searchParams }: Props) {
	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 9
	const projects: getAllProjectsForServerPageType = await getAllProjectsForServerPage(pageSize, pageNumber)
	const locale = (await params).locale
	const dic = await getDictionary(locale)

	return (
		<section className="flex flex-col items-center justify-center gap-6">
			<div className="flex flex-col items-center justify-center gap-2">
				<h1>
					{dic.projectsPage.title} <span className="text-primary">{dic.projectsPage.titleSpan}</span>
				</h1>
				<h6 className="text-center max-w-md">{dic.projectsPage.subTitle}</h6>
			</div>

			{/* --------------------------- project cards -------------------------- */}
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center  gap-6 w-full">
				{projects?.data.map((project) => (
					<ProjectCard project={project} key={project.id} locale={locale} />
				))}
			</div>

			{/* ---------------------------- Pagination ---------------------------- */}
			<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={projects?.totalPages ?? 0} />
		</section>
	)
}
