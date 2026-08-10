"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useCurrentLocale } from "@/locales/client.locale"

type Props = {
	mainImage: string
	images: string[]
	alt: string
}

export default function ImageSlider({ images, mainImage, alt = "image" }: Props) {
	const allImagesArray = [mainImage, ...images]
	const [activeImage, setActiveImage] = useState(allImagesArray[0])
	const locale = useCurrentLocale()

	return (
		<div className="w-full  h-fit! flex flex-col lg:gap-4 gap-2 ">
			<Dialog>
				<DialogTrigger>
					<div className=" w-full  relative aspect-video">
						<Image src={activeImage} alt={alt} fill className="object-cover rounded-xl" />
					</div>
				</DialogTrigger>
				<DialogContent className="p-0 h-[90vh] w-[90vw] max-w-none! overflow-hidden flex items-center justify-center aspect-video! ">
					<Carousel
						className="w-full  "
						opts={{
							loop: true,
							direction: locale === "en" ? "ltr" : "rtl",
						}}
					>
						<CarouselContent className="w-full h-full ">
							{allImagesArray.map((img, index) => (
								<CarouselItem key={index} className="aspect-video basis-full h-full relative">
									<Image src={img} alt={alt} fill className="object-cover rounded-xl " />
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="inset-s-4 z-10" />
						<CarouselNext className="inset-e-4 z-10" />
					</Carousel>
				</DialogContent>
			</Dialog>

			<div className="size-full h-2/12  rounded-lg  overflow-x-auto flex lg:gap-4 gap-2 ">
				{allImagesArray.map((image, index) => (
					<div
						className={`rounded-lg aspect-video relative min-w-44 h-full ${activeImage === image ? "border-2 border-primary" : "border"}`}
						key={index}
						onClick={() => setActiveImage(image)}
					>
						<Image src={image} alt={alt} fill className="object-cover rounded-lg" />
					</div>
				))}
			</div>
		</div>
	)
}
