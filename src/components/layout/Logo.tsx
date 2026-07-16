"use client"

import { useCurrentLocale } from "@/locales/client.locale"
import Link from "next/link"
import { RiCharacterRecognitionFill } from "react-icons/ri"

export default function Logo() {
	const locale = useCurrentLocale()

	return (
		<Link href={"/"} className="flex items-end gap-0.5 ">
			<RiCharacterRecognitionFill size={40} className="text-primary " />
			<h3 className="capitalize! hidden lg:block"> {locale === "en" ? "Ahmed" : "أحمد"}</h3>
		</Link>
	)
}
