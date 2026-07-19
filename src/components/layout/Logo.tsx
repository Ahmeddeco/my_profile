"use client"

import { useCurrentLocale } from "@/locales/client.locale"
import Link from "next/link"
import { RiCharacterRecognitionFill } from "react-icons/ri"

type Props = {
	className?: string
}

export default function Logo({ className }: Props) {
	const locale = useCurrentLocale()

	return (
		<Link href={"/"} className="flex items-end gap-0 ">
			<RiCharacterRecognitionFill size={40} className="text-primary " />
			<h2 className={` ${className} uppercase`}> {locale === "en" ? "hmed" : "أحمد"}</h2>
		</Link>
	)
}
