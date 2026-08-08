import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import { Toaster } from "@/components/ui/sonner"
import { CircleAlert, CircleCheckBig, CircleX } from "lucide-react"

export default function FrontLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="min-h-dvh container mx-auto pt-4 lg:pt-20 " suppressHydrationWarning>
				{children}
			</main>
			<Toaster
				theme="system"
				richColors
				duration={5000}
				icons={{
					success: <CircleCheckBig />,
					warning: <CircleAlert />,
					error: <CircleX />,
				}}
			/>
			<Footer />
		</>
	)
}
