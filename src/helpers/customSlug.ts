export function customSlug(input: string): string {
  let text = input.trim()

  // 1. إزالة التكرار المباشر إذا كان النص مكررًا وملتصقًا في المنتصف
  const halfLength = text.length / 2
  if (text.length % 2 === 0 && text.slice(0, halfLength) === text.slice(halfLength)) {
    text = text.slice(0, halfLength)
  }

  // 2. إزالة الكلمات المكررة المتباعدة (إن وجدت)
  const uniqueWords = Array.from(new Set(text.split(/\s+/)))
  text = uniqueWords.join(' ')

  // 3. التحويل إلى Slug عربي
  return text
    .replace(/\s+/g, '-')                   // استبدال المسافات بـ (-)
    .replace(/[^\w\u0600-\u06FF-]/g, '')     // إزالة الرموز الخاصة والإبقاء على العربية والإنجليزية
    .replace(/\-\-+/g, '-')                 // دمج الشرطات المتكررة
    .replace(/^-+|-+$/g, '')               // تنظيف الشرطات من البداية والنهاية
}
