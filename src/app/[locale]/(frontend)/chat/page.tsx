import BotChat from "@/components/shared/BotChat"

export default function BotPage() {
	return (
		<BotChat
			apiRoute={"/api/chat/user"}
			placeholder={{
				en: "Write what you need?",
				ar: "أكتب ما تريده هنا",
			}}
			emptyTitle={{
				en: "Hello, I'm chat Bot",
				ar: "مرحبا, أنا تشات بوت",
			}}
			emptyDescription={{
				en: "Your smart assistant to provide you with innovative solutions",
				ar: "مساعدك الذكي لأقدم لك حلولا مبتكرة ",
			}}
		/>
	)
}
