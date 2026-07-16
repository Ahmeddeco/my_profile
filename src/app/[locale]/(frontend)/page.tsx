import Hero from "@/components/pages/home/Hero"

type Props = {
	params: Promise<{ locale: "ar" | "en" }>
}

export default async function HomePage({ params }: Props) {
	const locale = (await params).locale

	return (
		<>
			<Hero locale={locale} />
		</>
	)
}
