import Hero from "@/components/frontend/home/Hero"
import Services from "@/components/frontend/home/Services"
import Technologies from "@/components/frontend/home/Technologies"
import WhyYouHireMe from "@/components/frontend/home/WhyYouHireMe"

type Props = {
	params: Promise<{ locale: "ar" | "en" }>
}

export default async function HomePage({ params }: Props) {
	const locale = (await params).locale

	return (
		<>
			<Hero locale={locale} />
			<Services locale={locale} />
			<WhyYouHireMe locale={locale} />
			<Technologies locale={locale} />
		</>
	)
}
