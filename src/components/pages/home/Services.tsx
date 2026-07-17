import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
		<Card className="bg-primary ">
			<CardHeader>
				<CardTitle className="text-primary-foreground">{dic.homePage.services.title}</CardTitle>
				<CardDescription className="text-primary-foreground">{dic.homePage.services.description}</CardDescription>
				<Separator />
			</CardHeader>
			<CardContent className="flex flex-wrap gap-6">
				{myServices.map(({ href, image, titleAr, titleEn }, index) => (
					<Card className={`min-w-sm flex-1 `} key={index}>
						<CardHeader>
							<CardTitle>{locale === "en" ? titleEn : titleAr}</CardTitle>
						</CardHeader>
						<CardContent>
							<Image src={image} alt={"services"} width={1600} height={900} className="object-cover rounded-lg" />
						</CardContent>
						<CardFooter>
							<Button asChild size={"full"}>
								<Link href={href}>
									<ExternalLink />
									{locale === "en" ? `go to ${titleEn}` : `اذهب الى ${titleAr}`}
								</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</CardContent>
		</Card>
	)
}
