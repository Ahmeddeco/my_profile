import { ImageOff, PlusCircle } from "lucide-react"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { Role } from "@/generated/prisma/enums"
import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import { Badge } from "@/components/ui/badge"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { dateFormate } from "@/logic/dateFormate"
import ServerPageCard from "@/components/backend/ServerPageCard"
import Settings from "@/components/backend/Settings"
import PaginationSection from "@/components/backend/Pagination"
import { connection } from "next/server"
import { getAllCoursesForPageType } from "@/app/[locale]/server/courses/modules/course.type"
import { getAllCoursesForPage } from "@/app/[locale]/server/courses/modules/course.data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { deleteCourseAction } from "@/app/[locale]/server/courses/modules/course.action"

export default async function CoursesPage({
	searchParams,
	params,
}: {
	searchParams: Promise<{ page: string; size: string }>
	params: Promise<{ locale: "en" | "ar" }>
}) {
	await connection()
	await isAllowedRoles([Role.admin, Role.instructor])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const courses: getAllCoursesForPageType = await getAllCoursesForPage(pageSize, pageNumber)
	const locale = (await params).locale

	return (
		<ServerPageCard
			btnTitle="add course"
			icon={PlusCircle}
			title={"all courses"}
			description={"All courses in the database."}
			href={"/server/courses/add"}
		>
			{!courses?.data.length ? (
				<EmptyCard href={"/server/courses/add"} linkTitle={"add course"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>Image</TableHead>
							<TableHead>title</TableHead>
							<TableHead>field</TableHead>
							<TableHead>instructor</TableHead>
							<TableHead>created At</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{courses.data.map(({ createdAt, field, id, instructor, mainImage, titleAr, titleEn }) => (
							<TableRow key={id}>
								<TableCell>
									{mainImage ? (
										<Image
											src={mainImage}
											alt={titleAr}
											width={48}
											height={48}
											className=" object-cover aspect-square rounded-lg"
										/>
									) : (
										<ImageOff size={48} />
									)}
								</TableCell>
								<TableCell>{locale === "en" ? titleEn : titleAr}</TableCell>
								<TableCell>
									<Badge>{field}</Badge>
								</TableCell>
								<TableCell>
									<Item size={"xs"} className="px-0">
										<ItemMedia variant={"icon"}>
											<Avatar>
												<AvatarImage src={instructor.image ?? ""} />
												<AvatarFallback>{instructor.name[0]}</AvatarFallback>
											</Avatar>
										</ItemMedia>
										<ItemContent>
											<ItemTitle>{instructor.name}</ItemTitle>
										</ItemContent>
									</Item>
								</TableCell>
								<TableCell>{dateFormate(createdAt)}</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<Settings
									id={id}
									deleteAction={deleteCourseAction}
									editLink={`/server/courses/edit/${id}`}
									deleteName={"Course"}
								/>
							</TableRow>
						))}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<TableCaption>
						<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={courses.totalPages} />
					</TableCaption>
				</Table>
			)}
		</ServerPageCard>
	)
}
