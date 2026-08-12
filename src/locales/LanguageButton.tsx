"use client"
import { useChangeLocale, useCurrentLocale } from "@/locales/client.locale"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function LanguageButton() {
	const changeLocale = useChangeLocale()
	const locale = useCurrentLocale()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={"icon-sm"} variant={"ghost"}>
					{locale}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center">
				<DropdownMenuItem onClick={() => changeLocale("ar")}>Ar</DropdownMenuItem>
				<DropdownMenuItem onClick={() => changeLocale("en")}>En</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
