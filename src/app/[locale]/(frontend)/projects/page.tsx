import PaginationSection from "@/components/backend/Pagination"
import ProjectCard from "@/components/pages/projects/ProjectCard"
import CategoryFilter from "@/components/shared/CategoryFilter"
import { getAllProjectsByCategory } from "@/dl/project.data"
import { ProductType } from "@/generated/prisma/enums"
import { getDictionary } from "@/locales/dictionaries"
import { getAllProjectsByCategoryType } from "@/types/project.type"

type Props = {
	params: Promise<{ locale: "en" | "ar" }>
	searchParams: Promise<{ page: string; size: string; category: ProductType }>
}

export default async function ProjectsPage({ params, searchParams }: Props) {
	const { page, size, category } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 9
	const projects: getAllProjectsByCategoryType = await getAllProjectsByCategory(pageSize, pageNumber, category)
	const locale = (await params).locale
	const dic = await getDictionary(locale)

	return (
		<section className="flex flex-col items-center justify-center gap-6">
			<div className="flex flex-col items-center justify-center gap-2 w-full">
				<h1>
					{dic.projectsPage.title} <span className="text-primary">{dic.projectsPage.titleSpan}</span>
				</h1>
				<h6 className="text-center max-w-md">{dic.projectsPage.subTitle}</h6>
				<div className="flex items-center justify-between w-full">
					<h4 className="text-center max-w-md capitalize self-start">
						{locale === "en" ? "total Projects:" : "عدد المشاريع:"}{" "}
						<span className="text-primary font-black text-2xl">{projects?.totalProjects}</span>
					</h4>
					<CategoryFilter className="self-start" category={category} />
				</div>
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
