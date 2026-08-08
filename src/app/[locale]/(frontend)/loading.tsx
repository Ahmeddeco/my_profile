import { Skeleton } from "@/components/ui/skeleton"

export default function HomeLoading() {
	return (
		<section className=" min-h-[80vh] flex flex-col items-center gap-6 h-auto ">
			{/* ------------------------------- title ------------------------------ */}
			<div className="flex flex-col items-center gap-6">
				<Skeleton className="w-sm h-10" />

				<Skeleton className="w-lg h-24 " />
			</div>

			{/* --------------------------- main section --------------------------- */}
			<div className="flex flex-wrap-reverse gap-6  w-full items-center justify-center size-auto">
				{/* -------------------------------- text -------------------------------- */}
				<div className="flex-1 w-full min-w-xs flex flex-col gap-6 ">
					<Skeleton className="size-16" />

					<Skeleton className="w-xs h-8" />

					<div className="flex flex-col gap-1">
						<Skeleton className="w-xs h-4" />
						<Skeleton className="w-xs h-4" />
					</div>
				</div>

				{/* -------------------------------- Image ------------------------------- */}
				<div className="flex-2 min-w-xs w-full aspect-square  rounded-full ">
					<Skeleton className="size-full rounded-full" />
				</div>

				{/* -------------------------------- stars ------------------------------- */}
				<div className="flex-1 hidden min-w-xs w-full lg:flex flex-col gap-6 ">
					<div className="flex items-center gap-2">
						{Array.from({ length: 5 }).map((_, index) => (
							<Skeleton className="size-4" key={index} />
						))}
					</div>
					<Skeleton className="w-md h-4" />
					<Skeleton className="w-sm h-8" />
				</div>
			</div>
		</section>
	)
}
