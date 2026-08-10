import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest } from 'next/server'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  resolveLocaleFromRequest: (request: NextRequest) => {
    const cookieLocale = request.cookies.get('Next-Locale')?.value
    if (cookieLocale === 'en' || cookieLocale === 'ar') {
      return cookieLocale
    }
    return 'en'
  },
})

export function proxy(request: NextRequest) {
  return I18nMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}