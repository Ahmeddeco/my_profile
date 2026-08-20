import { technologies } from "@/constants/homePage"
import { getDictionary } from "@/locales/dictionaries"
import React from "react"
import { Button } from "@/components/ui/button"

type Props = {
	locale: "ar" | "en"
}

export default async function Technologies({ locale }: Props) {
	const dic = await getDictionary(locale)

	return (
		<section className="flex flex-col items-center justify-center gap-10">
			<div className="flex flex-col items-center justify-center gap-2">
				<h2 className="text-primary">{dic.homePage.technologies.title}</h2>
				<h6 className="max-w-lg text-center text-balance">{dic.homePage.technologies.subTitle}</h6>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-4">
				{technologies.map(({ icon, title }, index) => (
					<Button key={index} className="cursor-none  " variant={"outline"} size={"sm"}>
						{React.createElement(icon)}
						{title}
					</Button>
				))}
			</div>
		</section>
	)
}
