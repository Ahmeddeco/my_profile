import { connection } from "next/server"

export default async function ChartsPage() {
	await connection()
	return <h1>Welcome to Chartspage!</h1>
}
