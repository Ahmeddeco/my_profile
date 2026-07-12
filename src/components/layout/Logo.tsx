"use client"

import { useCurrentLocale } from "@/locales/client.locale"
import Link from "next/link"
import { TbBrandDolbyDigital } from "react-icons/tb"
export default function Logo() {
	const locale = useCurrentLocale()

	return (
		<Link href={"/"} className="flex items-center gap-1 ">
			<TbBrandDolbyDigital size={52} className="text-primary size-full" />
			<h2 className="capitalize! hidden lg:block"> {locale === "en" ? "digital" : "ديجيتال"}</h2>
		</Link>
	)
}
