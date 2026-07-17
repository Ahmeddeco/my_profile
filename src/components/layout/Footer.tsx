"use client"

import Link from "next/link"
import Logo from "./Logo"
import { Separator } from "../ui/separator"
import { Copyright } from "lucide-react"
import Socials from "./Socials"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useCurrentLocale } from "@/locales/client.locale"

export default function Footer() {
	const locale = useCurrentLocale()

	return (
		<footer className="bg-card border-t border-foreground py-16 px-6">
			<div className="container mx-auto">
				{/* --------------------------- 1. قسم من نحن --------------------------- */}
				<div className="flex flex-col gap-6 items-center justify-center">
					<Logo />
					<h6 className="max-w-lg text-center text-balance">
						{locale === "en"
							? "A full-stack web developer specializing in building smart and customized digital solutions. Combine the power of Next.js with the flexibility of Mastra AI to deliver exceptional user experiences and intelligent systems that efficiently serve your business."
							: "مطور ويب متكامل ومتخصص في بناء حلول رقمية ذكية ومخصصة. أدمج بين قوة Next.js ومرونة Mastra AI لتقديم تجارب مستخدم استثنائية وأنظمة ذكية تخدم عملك بكفاءة."}
					</h6>
					<Socials />
					<Separator className="my-6" />
				</div>

				{/* حقوق النشر */}
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<Badge>
						<Copyright />
						{locale === "en" ? "Built with Next.js & Mastra AI 2026" : "تم تطويره باستخدام Next.js و Mastra AI 2026"}
					</Badge>
					<div className="flex items-center justify-center gap-8">
						<Button asChild variant={"link"}>
							<Link href="#">سياسة الخصوصية</Link>
						</Button>
						<Button asChild variant={"link"}>
							<Link href="#">شروط الخدمة</Link>
						</Button>
					</div>
				</div>
			</div>
		</footer>
	)
}
