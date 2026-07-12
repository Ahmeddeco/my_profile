type sortByItemsType = {
  titleAr: string
  titleEn: string
  value: string
}[]


export const sortByItems: sortByItemsType = [
  {
    titleAr: "جديد",
    titleEn: "new",
    value: "new",
  },
  {
    titleAr: "الأحدث",
    titleEn: "Latest",
    value: "latest",
  },
  {
    titleAr: "السعر: من الأقل للأعلى",
    titleEn: "Price: Low to High",
    value: "price-asc",
  },
  {
    titleAr: "السعر: من الأعلى للأقل",
    titleEn: "Price: High to Low",
    value: "price-desc",
  },
]