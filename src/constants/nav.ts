import { Brush, Home, MapPin, Newspaper, Package2, Server, Smartphone, } from "lucide-react"
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6"
import { RiRobot3Line } from "react-icons/ri"


export const frontNavLinks = [
  {
    title: { ar: "الرئيسية", en: "home" },
    href: "/",
    icon: Home
  },
  {
    title: { ar: "تصميماتنا", en: "designs" },
    href: "/designs",
    icon: Brush
  },
  {
    title: { ar: "منتجاتنا", en: "products" },
    href: "/products",
    icon: Package2
  },
  {
    title: { ar: "مقالاتنا", en: "articles" },
    href: "/articles",
    icon: Newspaper
  },
  {
    title: { ar: "ديكو بوت", en: "deco bot" },
    href: "/bot",
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