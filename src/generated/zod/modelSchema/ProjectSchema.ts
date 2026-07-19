import { z } from 'zod';
import { ProductTypeSchema } from '../inputTypeSchemas/ProductTypeSchema'

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  type: ProductTypeSchema,
  id: z.string(),
  slug: z.string(),
  titleAr: z.string(),
  titleEn: z.string(),
  miniDescriptionAr: z.string(),
  miniDescriptionEn: z.string(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
  url: z.string(),
  mainImage: z.string(),
  images: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export type Project = z.infer<typeof ProjectSchema>

export default ProjectSchema;
