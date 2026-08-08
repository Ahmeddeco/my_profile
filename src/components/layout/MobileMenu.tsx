import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Logo from "./Logo"
import { ThemeButton } from "../theme/ThemeButton"
import UserButton from "@/components/auth/UserButton"
import FrontNavigation from "./FrontNavigation"
import LanguageButton from "./LanguageButton"
import { Separator } from "../ui/separator"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function MobileMenu() {
	return (
		<>
			<Sheet>
				<SheetTrigger>
					<Menu />
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>
							<Logo />
						</SheetTitle>
						<Separator />
					</SheetHeader>
					<nav className="flex flex-col items-center gap-8 p-4 h-fit w-full  ">
						<FrontNavigation />
					</nav>
					<SheetFooter className="flex-row items-center justify-between border-t shadow-md">
						<Suspense fallback={<Skeleton className="size-8 rounded-full " />}>
							<UserButton />
						</Suspense>
						<LanguageButton />
						<ThemeButton />
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	)
}
