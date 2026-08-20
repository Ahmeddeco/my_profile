import { getDictionary } from "@/locales/dictionaries"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type Props = {
	locale: "ar" | "en"
}

export default async function WhyYouHireMe({ locale }: Props) {
	const dic = await getDictionary(locale)

	return (
		<section className="flex items-center justify-center flex-wrap gap-6">
			{/* ------------------------------- Image ------------------------------ */}
			<div className="flex-1 min-w-xs  w-full aspect-square relative rounded-full bg-radial from-primary via-transparent to-transparent">
				<Image src={"/images/blueJacket.webp"} alt={"Ahmed profile image"} fill className="object-contain" />
			</div>

			{/* ------------------------------- Text ------------------------------- */}
			<div className="flex-1 flex-col gap-6 min-w-2xs w-full">
				<h2>
					{dic.homePage.hireMe.title} <span className="text-primary">{dic.homePage.hireMe.titleSpan}</span> <br />
					{dic.homePage.hireMe.titleBr}
				</h2>

				{/* ---------------------------- Accordion --------------------------- */}
				<Accordion type="single" collapsible defaultValue="1">
					{dic.homePage.hireMe.whyChooseMe.map(({ description, title }, index) => (
						<AccordionItem value={String(index + 1)} key={index}>
							<AccordionTrigger>{title}</AccordionTrigger>
							<AccordionContent>{description}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}
