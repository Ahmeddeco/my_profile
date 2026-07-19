import type { Metadata } from "next"
import "../globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import localFont from "next/font/local"
import { DirectionProvider } from "@/components/ui/direction"

import { TooltipProvider } from "@/components/ui/tooltip"

const cairo = localFont({
	src: "../../../public/fonts/Cairo.ttf",
	variable: "--cairo-font",
})
export const metadata: Metadata = {
	title: "Ahmed Abdelfattah | Agentic AI Engineer",
	description: "Agentic Ai Engineer & Full-Stack Web Developer. Professional in Next-js , Mastra-ai , Typescript. ",
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const locale = (await params).locale

	return (
		<html
			lang={locale}
			dir={locale === "ar" ? "rtl" : "ltr"}
			className={`h-full antialiased ${cairo.className}`}
			suppressHydrationWarning
		>
			<body className="scroll-smooth" suppressHydrationWarning>
				<ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
					<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
					<TooltipProvider>
						<DirectionProvider dir={locale === "ar" ? "rtl" : "ltr"}>{children}</DirectionProvider>
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
