/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useCurrentLocale } from "@/locales/client.locale"

type Props = {
	mainImage: string
	images?: string[]
	alt: string
}

export default function ImageSlider({ images, mainImage, alt = "image" }: Props) {
	const allImagesArray = [mainImage, ...(images || [])].filter(
		(img): img is string => typeof img === "string" && img.trim() !== "",
	)

	const [activeImage, setActiveImage] = useState(allImagesArray[0] || "")
	const locale = useCurrentLocale()
	const containerRef = useRef<HTMLDivElement>(null)

	if (allImagesArray.length === 0) return null
	const hasMultipleImages = allImagesArray.length > 1

	const handleOpenChange = async (open: boolean) => {
		if (open) {
			try {
				// 2. فحص وجود العنصر لتجنب خطأ الـ null في TypeScript
				if (containerRef.current && document.fullscreenEnabled) {
					await containerRef.current.requestFullscreen().catch(() => {})
				}
				if (window.screen?.orientation && "lock" in window.screen.orientation) {
					await (window.screen.orientation as any).lock("landscape").catch(() => {})
				}
			} catch (err) {
				console.log("Screen orientation locking failed:", err)
			}
		} else {
			try {
				if (window.screen?.orientation && "unlock" in window.screen.orientation) {
					window.screen.orientation.unlock()
				}
				if (document.fullscreenElement) {
					await document.exitFullscreen().catch(() => {})
				}
			} catch (err) {
				console.log("Screen orientation unlock failed:", err)
			}
		}
	}

	return (
		<div className="w-full h-fit! flex flex-col lg:gap-4 gap-2">
			<Dialog onOpenChange={handleOpenChange}>
				<DialogTrigger asChild>
					<div className="w-full relative aspect-video cursor-pointer">
						<Image src={activeImage} alt={alt} fill className="object-cover object-top rounded-xl" priority />
					</div>
				</DialogTrigger>
				<DialogContent className="p-0 h-dvh w-dvw max-w-none! overflow-hidden flex items-center justify-center aspect-video!">
					<Carousel
						className="size-full"
						opts={{
							loop: true,
							direction: locale === "en" ? "ltr" : "rtl",
						}}
					>
						<CarouselContent className="w-full h-full">
							{allImagesArray.map((img, index) => (
								<CarouselItem key={index} className="aspect-video basis-full  relative">
									<Image src={img} alt={alt} fill className="object-cover rounded-xl " />
								</CarouselItem>
							))}
						</CarouselContent>
						{hasMultipleImages && (
							<>
								<CarouselPrevious className="inset-s-4 z-10" />
								<CarouselNext className="inset-e-4 z-10" />
							</>
						)}
					</Carousel>
				</DialogContent>
			</Dialog>

			{hasMultipleImages && (
				<div className="size-full h-2/12 rounded-lg overflow-x-auto flex lg:gap-4 gap-2">
					{allImagesArray.map((image, index) => (
						<div
							className={`rounded-lg aspect-video relative min-w-44 h-full cursor-pointer ${
								activeImage === image ? "border-2 border-primary" : "border"
							}`}
							key={index}
							onClick={() => setActiveImage(image)}
						>
							<Image src={image} alt={alt} fill className="object-cover rounded-lg" />
						</div>
					))}
				</div>
			)}
		</div>
	)
}
