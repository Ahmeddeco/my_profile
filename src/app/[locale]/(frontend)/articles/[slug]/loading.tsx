import { Skeleton } from "@/components/ui/skeleton"

export default function OneArticleLoading() {
	return (
		<article className="flex  flex-col gap-6 pt-8 px-4 w-full max-w-6xl mx-auto">
			<div className="">
				<Skeleton className="aspect-video w-full" />
			</div>
			<div className=" flex flex-col gap-4">
				{/* ------------------------------ title ----------------------------- */}
				<Skeleton className="h-6 w-2xl" />
				{/* ------------------------- Description ------------------------ */}
				<Skeleton className="h-4 w-4xl" />
				<Skeleton className="h-4 w-5xl" />
				{/* -------------------- client - type - createdAt ------------------- */}
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-6 w-24 rounded-full" />
					<Skeleton className="h-6 w-32 rounded-full" />
				</div>
			</div>
		</article>
	)
}
