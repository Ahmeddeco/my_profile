import { SiMastodon, SiMongodb, SiNextdotjs, SiPrisma, SiReact, SiShadcnui, SiTailwindcss } from "react-icons/si"
import { BiLogoPostgresql } from "react-icons/bi"
import { ProductType } from "@/generated/prisma/enums"

export const myServices = [
  {
    titleAr: "تطوير مواقع ويب",
    titleEn: "web development",
    image: "/images/webDevelop.webp",
    href: `/projects?category=${ProductType.web}`,
  },
  {
    titleAr: "تطوير وكلاء ذكاء اصطناعي",
    titleEn: "Agentic ai development ",
    image: "/images/baladyBot.webp",
    href: `/projects?category=${ProductType.ai}`,
  },
  {
    titleAr: "تطوير تطبيقات موبايل",
    titleEn: "mobile development",
    image: "/images/mobileDevelop.webp",
    href: `/projects?category=${ProductType.mobile}`,
  },
]

export const technologies = [
  {
    title: "next-js",
    icon: SiNextdotjs,
  },
  {
    title: "react-js",
    icon: SiReact,
  },
  {
    title: "tailwind-css",
    icon: SiTailwindcss,
  },
  {
    title: "shadcn",
    icon: SiShadcnui,
  },
  {
    title: "prisma-db",
    icon: SiPrisma,
  },
  {
    title: "Postgres",
    icon: BiLogoPostgresql,
  },
  {
    title: "Mongodb",
    icon: SiMongodb,
  },
  {
    title: "mastra-ai",
    icon: SiMastodon,
  },
]