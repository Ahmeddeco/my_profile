import Footer from "@/components/layout/Footer"
import { ServerSidebar } from "@/components/layout/ServerSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { CircleAlert, CircleCheckBig, CircleX } from "lucide-react"

export default async function ServerLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: "ar" | "en" }>
}) {
	const locale = (await params).locale

	return (
		<SidebarProvider suppressHydrationWarning>
			<ServerSidebar locale={locale} />
			<div className=" w-full flex flex-col justify-between">
				<main className="w-full px-6 py-12">
					<SidebarTrigger dir={locale === "ar" ? "rtl" : "ltr"} />
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
			</div>
		</SidebarProvider>
	)
}
