import { Skeleton } from "@/components/ui/skeleton"

export default function ArticlesLoading() {
	return (
		<section className="flex flex-col items-center justify-center gap-6">
			<div className="flex flex-col items-center justify-center gap-2 w-full">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[400px]" />
				<Skeleton className="h-4 w-[150px]" />
			</div>

			{/* --------------------------- project cards -------------------------- */}
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center  gap-6 w-full">
				{Array.from({ length: 6 }).map((_, index) => (
					<Skeleton className="max-w-lg w-full aspect-square rounded-xl shadow-lg" key={index} />
				))}
			</div>
		</section>
	)
}
