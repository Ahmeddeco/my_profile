import { Code, Home, MapPin, Newspaper, Server, Smartphone, } from "lucide-react"
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6"
import { RiRobot3Line } from "react-icons/ri"


export const frontNavLinks = [
  {
    title: { ar: "الرئيسية", en: "home" },
    href: "/",
    icon: Home
  },
  {
    title: { ar: "مشاريعنا", en: "projects" },
    href: "/projects",
    icon: Code
  },
  {
    title: { ar: "مقالاتنا", en: "articles" },
    href: "/articles",
    icon: Newspaper
  },
  {
    title: { ar: "بوت", en: "bot" },
    href: "/chat",
    icon: RiRobot3Line
  },

  {
    title: { ar: "السيرفر", en: " server " },
    href: "/server",
    icon: Server
  },
]

export const socials = [
  {
    href: "https://www.facebook.com/",
    icon: FaFacebookF
  },
  {
    href: "https://www.instagram.com/",
    icon: FaInstagram
  },
  {
    href: "https://x.com/",
    icon: FaXTwitter
  },
]

export const footerData = [
  {
    icon: MapPin,
    title: "شبين الكوم - المنوفية - مصر"
  },
  {
    icon: Smartphone,
    title: "01152640142"
  },
]