import { ChartNoAxesCombined, Newspaper, Server, Users } from "lucide-react"
import { GrGroup, GrProjects } from "react-icons/gr"
import { FaChalkboardTeacher } from "react-icons/fa"
import { HiOutlineAcademicCap } from "react-icons/hi2"
import { CiLocationOn } from "react-icons/ci"

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
    title: { ar: "مقالاتنا", en: "articles" },
    href: "/server/articles",
    icon: Newspaper
  },
  {
    title: { ar: "الكورسات", en: "courses" },
    href: "/server/courses",
    icon: FaChalkboardTeacher
  },
  {
    title: { ar: "الأكاديميات", en: "academies" },
    href: "/server/courses/academies",
    icon: HiOutlineAcademicCap
  },
  {
    title: { ar: "الفروع", en: "branches" },
    href: "/server/courses/branches",
    icon: CiLocationOn
  },
  {
    title: { ar: "الدفعة", en: "groups" },
    href: "/server/courses/groups",
    icon: GrGroup
  },
  {
    title: { ar: "الإحصائيات", en: "charts" },
    href: "/server/charts",
    icon: ChartNoAxesCombined
  },

]