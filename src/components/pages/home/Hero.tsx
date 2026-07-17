import { Button } from "@/components/ui/button"
import { getDictionary } from "@/locales/dictionaries"
import { Code, Quote, Star } from "lucide-react"
import Image from "next/image"
import { HiArrowUturnRight } from "react-icons/hi2"

type Props = {
	locale: "ar" | "en"
}

export default async function Hero({ locale }: Props) {
	const dic = await getDictionary(locale)

	return (
		<section className=" min-h-[80vh] flex flex-col items-center  gap-6 h-auto ">
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
			<div className="flex flex-wrap gap-6  w-full items-center  justify-center">
				{/* -------------------------------- text -------------------------------- */}
				<div className="flex-1 w-full flex flex-col gap-6 ">
					<Quote fill="var(--primary)" color="var(--primary)" size={48} />
					<h3>{dic.homePage.hero.mainParagraph}</h3>
					<div className="flex flex-col gap-1">
						<h2>126+</h2>
						<h4>{dic.homePage.hero.clientServed}</h4>
					</div>
				</div>

				{/* -------------------------------- Image ------------------------------- */}
				<div className="flex-2 w-full aspect-square relative bg-radial  from-primary-foreground/60 via-primary to-primary/80  rounded-full ">
					<Image src={"/images/heroBlue.webp"} alt={"hero"} fill className=" object-cover " />
					<HiArrowUturnRight className="absolute top-1/4 left-1/12 text-primary-foreground" size={44} />
				</div>

				{/* -------------------------------- stars ------------------------------- */}
				<div className="flex-1 w-full flex flex-col gap-6 ">
					<div className="flex items-center gap-2">
						{Array.from({ length: 5 }).map((_, index) => (
							<Star key={index} color="var(--primary)" fill="var(--primary)" />
						))}
					</div>
					<h2 className="capitalize">{dic.homePage.hero.starsTitle}</h2>
					<h4 className="capitalize">{dic.homePage.hero.starsTitleBr}</h4>
				</div>
			</div>
		</section>
	)
}
