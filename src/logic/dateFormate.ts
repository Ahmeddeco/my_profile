type Props = {
  day: Date
  lang?: "ar-EG" | "en-US"
}

export const dateFormate = ({ day, lang = "en-US" }: Props) => {
  return day.toLocaleDateString(lang, {
    weekday: 'long',  // عرض اسم اليوم كاملاً (مثل: الأحد)
    year: 'numeric',  // عرض السنة بالأرقام (2026)
    month: 'long',    // اسم الشهر كاملاً (مثل: يوليو)
    day: 'numeric'
  })
}