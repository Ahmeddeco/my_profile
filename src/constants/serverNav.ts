import { ChartNoAxesCombined, Factory, Palette, Server, Shapes, Sofa, SwatchBook, Users } from "lucide-react"

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
    title: { ar: "المصانع", en: "factories" },
    href: "/server/factories",
    icon: Factory
  },
  {
    title: { ar: "الألوان", en: "colors" },
    href: "/server/colors",
    icon: SwatchBook
  },
  {
    title: { ar: "الفئات", en: "classes" },
    href: "/server/classes",
    icon: Shapes
  },
  {
    title: { ar: "الإستايلات", en: "styles" },
    href: "/server/styles",
    icon: Palette
  },
  {
    title: { ar: "المنتجات", en: "products" },
    href: "/server/products",
    icon: Sofa
  },
  {
    title: { ar: "الإحصائيات", en: "charts" },
    href: "/server/charts",
    icon: ChartNoAxesCombined
  },

]