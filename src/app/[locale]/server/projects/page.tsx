import { ImageOff, MoreVertical, PlusCircle } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import Form from "next/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Role } from "@/generated/prisma/enums"
import { isAllowedRoles } from "@/components/auth/isAllowedRoles"
import { getAllProjectsForServerPageType } from "@/types/project.type"
import { getAllProjectsForServerPage } from "@/dl/project.data"
import { deleteProjectAction } from "@/actions/project.action"
import { Badge } from "@/components/ui/badge"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { dateFormate } from "@/logic/dateFormate"

export default async function ProjectsPage({
	searchParams,
	params,
}: {
	searchParams: Promise<{ page: string; size: string }>
	params: Promise<{ locale: "en" | "ar" }>
}) {
	await isAllowedRoles([Role.admin])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const projects: getAllProjectsForServerPageType = await getAllProjectsForServerPage(pageSize, pageNumber)
	const locale = (await params).locale

	return (
		<ServerPageCard
			btnTitle="add project"
			icon={PlusCircle}
			title={"all products"}
			description={"All projects in the database."}
			href={"/server/projects/add"}
		>
			{!projects?.data.length ? (
				<EmptyCard href={"/server/projects/add"} linkTitle={"add project"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>Image</TableHead>
							<TableHead>title</TableHead>
							<TableHead>type</TableHead>
							<TableHead>client</TableHead>
							<TableHead>created At</TableHead>
							<TableHead className="text-left">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{projects.data.map(({ id, mainImage, titleAr, client, createdAt, titleEn, type }) => (
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
									<Badge className="capitalize " variant={"outline"}>
										{type}
									</Badge>
								</TableCell>
								<TableCell>
									<Item size={"xs"} className="px-0">
										<ItemMedia variant="image">
											{client.image ? (
												<Image src={client.image} alt={client.name} width={48} height={48} />
											) : (
												<ImageOff />
											)}
										</ItemMedia>
										<ItemContent>
											<ItemTitle>{client.name}</ItemTitle>
										</ItemContent>
									</Item>
								</TableCell>
								<TableCell>{dateFormate({ day: createdAt })}</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<TableCell className="text-left">
									<DropdownMenu>
										<DropdownMenuTrigger>
											<MoreVertical />
										</DropdownMenuTrigger>
										<DropdownMenuContent align="start" className="space-y-2">
											<DropdownMenuItem asChild>
												<Button variant={"default"} size={"full"} asChild>
													<Link href={`/server/projects/edit/${id}`}>edit</Link>
												</Button>
											</DropdownMenuItem>
											{/* ---------------------------- delete --------------------------- */}
											<DropdownMenuItem asChild>
												<Dialog>
													<DialogTrigger asChild>
														<Button variant={"destructive"} size={"full"}>
															delete
														</Button>
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>
																{locale === "en"
																	? "Are you sure you want to delete this project ?"
																	: "هل أنت متأكد من رغبتك في حذف هذا المشروع؟"}
															</DialogTitle>
															<DialogDescription>
																{locale === "en"
																	? "This action can not be undone. This will permanently delete this project and remove its data from our servers."
																	: "لا يمكن التراجع عن هذا الإجراء. سيؤدي ذلك إلى حذف هذا المشروع نهائياً وإزالة بياناته من خوادمنا."}
															</DialogDescription>
														</DialogHeader>
														<div className="flex items-center justify-between ">
															<Button asChild variant={"outline"}>
																<DialogClose>cancel</DialogClose>
															</Button>
															<Form action={deleteProjectAction}>
																<Input type="hidden" name="id" value={id} />
																<Button variant={"destructive"} type="submit">
																	delete
																</Button>
															</Form>
														</div>
													</DialogContent>
												</Dialog>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<TableCaption>
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									{/* --------------------------- Previous --------------------------- */}
									{pageNumber > 1 && <PaginationPrevious href={`?size=${pageSize}&page=${pageNumber - 1}`} />}
								</PaginationItem>
								{/* ------------------------- PaginationLink ------------------------ */}
								{Array.from({ length: projects.totalPages ?? 1 }).map((_, index) => (
									<PaginationItem key={index}>
										<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									{/* ----------------------------- Next ----------------------------- */}
									{pageNumber < projects.totalPages && (
										<PaginationNext href={`?size=${pageSize}&page=${pageNumber + 1}`} />
									)}
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</TableCaption>
				</Table>
			)}
		</ServerPageCard>
	)
}
