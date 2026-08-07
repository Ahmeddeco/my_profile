"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { TableCell } from "@/components/ui/table"
import { MoreVertical } from "lucide-react"
import Form from "next/form"
import Link from "next/link"
import { useActionState } from "react"

type Props = {
	id: string
	deleteAction: (prevState: DeleteActionState, formData: FormData) => Promise<DeleteActionState>
	editLink: string
	deleteName: string
}

export type DeleteActionState = {
	success?: boolean
	error?: string | null
}

export default function Settings({ id, deleteAction, editLink, deleteName }: Props) {
	const [state, action, isPending] = useActionState(deleteAction, {
		success: false,
		error: null,
	})

	return (
		<TableCell className="text-end">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon">
						<MoreVertical className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="space-y-2">
					{/* -------------------------------- edit ------------------------------- */}
					<DropdownMenuItem asChild>
						<Button variant={"outline"} size={"full"} asChild>
							<Link href={editLink}>edit</Link>
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant={"destructive"} size={"full"}>
									delete
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>{`Are you sure you want to delete this ${deleteName} ?`}</DialogTitle>
									<DialogDescription>
										{`This action can not be undone. This will permanently delete this ${deleteName} and remove its data
									from our servers.`}
									</DialogDescription>
								</DialogHeader>
								<div className="flex items-center justify-between mt-4">
									<Button asChild variant={"outline"}>
										<DialogClose>cancel</DialogClose>
									</Button>
									{/* --------------------------------- Delete --------------------------------- */}
									<Form action={action}>
										<Input type="hidden" name="id" value={id} />
										{isPending ? (
											<Button variant="destructive" type="submit" disabled={isPending}>
												<Spinner /> Deleting...
											</Button>
										) : (
											<Button variant="destructive" type="submit" disabled={isPending}>
												Delete
											</Button>
										)}
										{state.error && <FieldError>{state.error}</FieldError>}
									</Form>
								</div>
							</DialogContent>
						</Dialog>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	)
}
