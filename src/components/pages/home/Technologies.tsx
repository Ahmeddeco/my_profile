import { getDictionary } from "@/locales/dictionaries"

type Props = {
	locale: "ar" | "en"
}

export default async function Technologies({ locale }: Props) {
	const dic = await getDictionary(locale)

	return <section className="">Technologies</section>
}
