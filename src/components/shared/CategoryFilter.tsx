"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { ProductType } from "@/generated/prisma/enums"
import Form from "next/form"
import { useState } from "react"

type Props = {
	className?: string
	category: ProductType
}
export default function CategoryFilter({ className, category }: Props) {
	const [categoryValue, setCategoryValue] = useState("")
	return (
		<Form action={""}>
			<Input type="hidden" name="category" value={categoryValue} />
			<ButtonGroup className={`${className} `}>
				<Button
					type="submit"
					name="category"
					onClick={() => setCategoryValue("")}
					variant={!category ? "default" : "outline"}
				>
					all
				</Button>
				{Object.values(ProductType).map((type) => (
					<Button
						key={type}
						variant={type === category ? "default" : "outline"}
						value={type}
						type="submit"
						onClick={() => setCategoryValue(type)}
					>
						{type}
					</Button>
				))}
			</ButtonGroup>
		</Form>
	)
}
