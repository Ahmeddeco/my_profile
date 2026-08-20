import { z } from 'zod'

export const ArticleSchema = z.object({
  id: z.string().nullish(),
  titleAr: z.string(),
  titleEn: z.string(),
  slug: z.string(),
  descriptionAr: z.string(),
  descriptionEn: z.string(),
  topicAr: z.string(),
  topicEn: z.string(),
  mainImage: z.string(),
  images: z.string().array(),
  createdAt: z.date(),
  userId: z.string(),
})

export type Article = z.infer<typeof ArticleSchema>

export default ArticleSchema
