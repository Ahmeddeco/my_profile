import ProductTypeSchema from "@/generated/zod/inputTypeSchemas/ProductTypeSchema"
import { z } from 'zod'


export const ProjectSchema = z.object({
  id: z.string().nullish(),
  type: ProductTypeSchema,
  slug: z.string().nullish(),
  titleAr: z.string(),
  titleEn: z.string(),
  miniDescriptionAr: z.string(),
  miniDescriptionEn: z.string(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
  url: z.string().url(),
  mainImage: z.string(),
  images: z.string().array(),
  createdAt: z.date(),
  userId: z.string(),
})

export type Project = z.infer<typeof ProjectSchema>

export default ProjectSchema
