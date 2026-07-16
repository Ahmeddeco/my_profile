import { Button } from "@/components/ui/button"
import { getDictionary } from "@/locales/dictionaries"
import { Code } from "lucide-react"
import Image from "next/image"
import { HiArrowUturnRight } from "react-icons/hi2"

type Props = {
	locale: "ar" | "en"
}

export default async function Hero({ locale }: Props) {
	const dic = await getDictionary(locale)

	return (
		<section className=" min-h-[80vh] flex flex-col items-center  gap-6 ">
			{/* ------------------------------- title ------------------------------ */}
			<div className="flex flex-col items-center gap-6">
				<Button variant={"outline"} size={"sm"} className=" relative">
					{dic.homePage.hero.mainButton} !
					<Code className="absolute -top-2 -right-4 text-primary " />
				</Button>
				<h1 className="text-center leading-relaxed">
					{dic.homePage.hero.title} <span className="text-primary">{dic.homePage.hero.titleSpan}</span>
					<br />
					{dic.homePage.hero.titleBr}
				</h1>
			</div>

			{/* --------------------------- main section --------------------------- */}
			<div className="flex flex-wrap gap-6  w-full  justify-center">
				<div className="flex-1 w-full  ">text</div>

				{/* -------------------------------- Image ------------------------------- */}
				<div className="flex-2 w-full aspect-square relative bg-radial  from-primary-foreground/60 via-primary to-primary/80  rounded-full ">
					<Image src={"/images/hero.webp"} alt={"hero"} fill className=" object-contain " />
					<HiArrowUturnRight className="absolute top-1/4 left-1/12 text-primary-foreground" size={44} />
				</div>
				<div className="flex-1 w-full  ">stars</div>
			</div>
		</section>
	)
}
