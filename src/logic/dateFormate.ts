type FormatType = 'full' | 'yearOnly' | 'monthAndYear' | "monthAndYearAndDay"

export const dateFormate = (
  day: Date,
  locale: 'ar' | 'en' = 'ar',
  formatType: FormatType = 'full'
) => {
  const targetLocale = locale === 'en' ? 'en-US' : 'ar-EG'

  // تحديد خيارات التنسيق حسب النوع المطلوب
  const optionsMap: Record<FormatType, Intl.DateTimeFormatOptions> = {
    full: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    yearOnly: {
      year: 'numeric',
    },
    monthAndYear: {
      month: 'long',
      year: 'numeric',
    },
    monthAndYearAndDay: {
      month: 'short',
      year: 'numeric',
      day: '2-digit',
    },
  }

  return day.toLocaleDateString(targetLocale, optionsMap[formatType])
}