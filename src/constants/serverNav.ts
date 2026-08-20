import { ChartNoAxesCombined, Newspaper, Server, Users } from "lucide-react"
import { GrProjects } from "react-icons/gr"
import { FaChalkboardTeacher } from "react-icons/fa"

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
    title: { ar: "الكورسات", en: "courses" },
    href: "/server/courses",
    icon: FaChalkboardTeacher
  },
  {
    title: { ar: "مقالاتنا", en: "articles" },
    href: "/server/articles",
    icon: Newspaper
  },
  {
    title: { ar: "الإحصائيات", en: "charts" },
    href: "/server/charts",
    icon: ChartNoAxesCombined
  },

]