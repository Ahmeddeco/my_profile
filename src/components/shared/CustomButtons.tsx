"use client"

import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { Loader2, LucideIcon, ShoppingBag, X } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { IoBagCheckOutline } from "react-icons/io5"
import { authClient } from "@/lib/auth-client"
import React from "react"
import { useCurrentLocale } from "@/locales/client.locale"
import { filteredProductType } from "@/types/product.type"

type SubmitButtonType = {
	title: string
	type?: "button" | "submit" | "reset" | undefined
	size?: "default" | "sm" | "lg" | "full" | "icon" | null | undefined
	variant?: "link" | "default" | "secondary" | "destructive" | "outline" | "ghost" | undefined
	icon: LucideIcon
}

/* ------------------------------ SubmitButton ------------------------------ */

export function SubmitButton({ title, type = "submit", size = "full", variant, icon }: SubmitButtonType) {
	const { pending } = useFormStatus()

	return (
		<>
			{pending ? (
				<Button disabled variant={variant} size={size}>
					<Loader2 className="size-4 animate-spin" />
					please wait
				</Button>
			) : (
				<Button type={type} size={size} variant={variant}>
					{icon && React.createElement(icon)}
					{title}
				</Button>
			)}
		</>
	)
}

/* -------------------------------- AddToCart ------------------------------- */

export function AddToCart({ product, className }: { product: filteredProductType; className?: string }) {
	const session = authClient.useSession()
	const { pending } = useFormStatus()
	const addToCart = useCartStore((state) => state.addToCart)
	const locale = useCurrentLocale()

	if (!session) return null
	return (
		<>
			{pending ? (
				<Button size={"full"} disabled className={className}>
					<Loader2 className="size-5 animate-spin" /> انتظر لحظة
				</Button>
			) : (
				<Button size={"full"} type="button" onClick={() => addToCart(product)} className={`${className} lg:flex-1`}>
					<ShoppingBag /> {locale === "en" ? "add to cart" : "أضف الى السلة"}
				</Button>
			)}
		</>
	)
}

/* ----------------------------- CheckOutButton ----------------------------- */

export const CheckOutButton = () => {
	const { pending } = useFormStatus()
	return (
		<>
			{pending ? (
				<Button disabled>
					<Loader2 className="size-5 animate-spin" /> please wait
				</Button>
			) : (
				<Button type="button" onClick={() => console.log("CheckOut Button pressed!")}>
					<IoBagCheckOutline /> إتمام عملية الشراء
				</Button>
			)}
		</>
	)
}

/* ---------------------------- deleteItemButton ---------------------------- */

export function DeleteItemButton() {
	const { pending } = useFormStatus()
	return (
		<>
			{pending ? (
				<Button disabled size={"sm"} variant={"destructive"}>
					<Loader2 className="size-5 animate-spin" /> removing ...
				</Button>
			) : (
				<Button type="submit" size={"icon"} variant={"destructive"}>
					<X /> delete
				</Button>
			)}
		</>
	)
}
