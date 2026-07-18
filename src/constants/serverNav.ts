import { ChartNoAxesCombined, Server, Users } from "lucide-react"
import { GrProjects } from "react-icons/gr"

export const serverNav = [
  {
    title: { ar: "سيرفر", en: "server" },
    href: "/server",
    icon: Server
  },
  {
    title: { ar: "الأشخاص", en: "users" },
    href: "/server/users",
    icon: Users
  },
  {
    title: { ar: "المشاريع", en: "projects" },
    href: "/server/projects",
    icon: GrProjects
  },
  {
    title: { ar: "الإحصائيات", en: "charts" },
    href: "/server/charts",
    icon: ChartNoAxesCombined
  },

]