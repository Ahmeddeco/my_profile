import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { myServices } from "@/constants/homePage"
import { getDictionary } from "@/locales/dictionaries"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Props = {
	locale: "ar" | "en"
}

export default async function Services({ locale }: Props) {
	const dic = await getDictionary(locale)

	return (
		<section className="flex flex-col items-center justify-center gap-6 ">
			<div className="flex flex-col items-center justify-center gap-2">
				<h2 className="text-primary">{dic.homePage.services.title}</h2>
				<h4 className="max-w-md text-center">{dic.homePage.services.description}</h4>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-6">
				{myServices.map(({ href, image, titleAr, titleEn }, index) => (
					<Card className={` min-w-3xs max-w-md w-full`} key={index}>
						<CardHeader>
							<CardTitle>{locale === "en" ? titleEn : titleAr}</CardTitle>
						</CardHeader>
						<CardContent>
							<Image src={image} alt={"services"} width={1600} height={900} className="object-cover rounded-lg" />
						</CardContent>
						<CardFooter className="justify-center">
							<Button asChild size={"full"}>
								<Link href={href}>
									<ExternalLink />
									{locale === "en" ? `go to ${titleEn}` : `اذهب الى ${titleAr}`}
								</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	)
}
