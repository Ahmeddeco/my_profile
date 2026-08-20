import withPWAInit from "@ducanh2912/next-pwa"


const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  dynamicStartUrl: true,
  reloadOnOnline: true,
})

export default withPWA({
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "cgvdfjzle1.ufs.sh" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "8skh3k9x4h.ufs.sh" },
    ]
  },
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true
  },
  turbopack: {},
  cacheComponents: true,
})