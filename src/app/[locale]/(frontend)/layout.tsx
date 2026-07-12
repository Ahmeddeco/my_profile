import Header from "@/components/layout/Header"

export default function FrontLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="min-h-dvh px-4 pt-14 lg:pt-20 " suppressHydrationWarning>
				{children}
			</main>
		</>
	)
}
