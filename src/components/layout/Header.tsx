import { ThemeButton } from "../theme/ThemeButton"
import FrontNavigation from "./FrontNavigation"
import LanguageButton from "./LanguageButton"
import Logo from "./Logo"
import MobileMenu from "./MobileMenu"
import UserButton from "@/components/auth/UserButton"

export default function Header() {
	return (
		<header
			suppressHydrationWarning
			className="fixed inset-0 w-full lg:container mx-auto lg:mt-6 lg:border border-b lg:rounded-full flex items-center justify-between h-12 bg-input/30 text-foreground backdrop-blur-lg px-4 lg:px-16 z-50  "
		>
			<Logo />
			<nav className="hidden lg:flex items-center gap-6">
				<FrontNavigation />
			</nav>
			<div className="hidden lg:flex items-center gap-4">
				<LanguageButton />
				<ThemeButton />
				<UserButton />
			</div>
			<div className="lg:hidden block">
				<MobileMenu />
			</div>
		</header>
	)
}
