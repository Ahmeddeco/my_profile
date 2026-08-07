import Hero from "@/components/pages/home/Hero"
import Services from "@/components/pages/home/Services"
import Technologies from "@/components/pages/home/Technologies"
import Testimonials from "@/components/pages/home/Testimonials"
import WhyYouHireMe from "@/components/pages/home/WhyYouHireMe"

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
			<Testimonials locale={locale} />
		</>
	)
}
