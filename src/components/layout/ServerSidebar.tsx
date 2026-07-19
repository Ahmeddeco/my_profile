import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarFooter,
} from "@/components/ui/sidebar"
import Logo from "./Logo"
import { ThemeButton } from "../theme/ThemeButton"
import ServerNavigation from "./ServerNavigation"
import UserButton from "@/components/auth/UserButton"
import LanguageButton from "./LanguageButton"

type Props = {
	locale: "ar" | "en"
}

export function ServerSidebar({ locale }: Props) {
	return (
		<Sidebar side={locale === "ar" ? "right" : "left"}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						<Logo className="text-sidebar-foreground" />
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-6 ">
						<ServerNavigation />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="flex flex-row items-center justify-between">
				<ThemeButton />
				<LanguageButton />
				<UserButton />
			</SidebarFooter>
		</Sidebar>
	)
}
