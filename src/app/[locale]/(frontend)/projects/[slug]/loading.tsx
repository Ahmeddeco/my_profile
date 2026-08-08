import { Skeleton } from "@/components/ui/skeleton"

export default function OneProjectLoading() {
	return (
		<article className="flex lg:flex-row flex-col gap-6  pt-8 px-4">
			<div className="flex-1 ">
				<div className="size-full aspect-square flex flex-col lg:gap-4 gap-2 ">
					<Skeleton className="aspect-square w-full h-10/12" />
					<div className="w-full h-2/12  rounded-lg  overflow-x-auto flex lg:gap-4 gap-2 ">
						{Array.from({ length: 3 }).map((_, index) => (
							<Skeleton className="aspect-video " key={index} />
						))}
					</div>
				</div>
			</div>
			<div className="flex-1 flex flex-col gap-2">
				{/* ------------------------------ title ----------------------------- */}
				<Skeleton className="w-2xs h-6" />
				{/* ------------------------- Description ------------------------ */}
				<Skeleton className="w-sm h-4" />
				{/* -------------------- client - type - createdAt ------------------- */}
				<div className="flex flex-wrap gap-2">
					<Skeleton className="w-24 h-4" />
					<Skeleton className="w-16 h-4" />
					<Skeleton className="w-36 h-4" />
				</div>
				<Skeleton className="w-md h-4" />

				{/* --------------------------- topic -------------------------- */}
				<Skeleton className="w-full h-96" />
			</div>
		</article>
	)
}
