import { z } from 'zod';
import { FieldSchema } from '../inputTypeSchemas/FieldSchema'

/////////////////////////////////////////
// COURSE SCHEMA
/////////////////////////////////////////

export const CourseSchema = z.object({
  field: FieldSchema,
  id: z.string(),
  titleAr: z.string(),
  titleEn: z.string(),
  slug: z.string(),
  descriptionAr: z.string(),
  descriptionEn: z.string(),
  detailsAr: z.string(),
  detailsEn: z.string(),
  price: z.number(),
  discountAmount: z.number().nullish(),
  mainImage: z.string(),
  images: z.string().array(),
  instructorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Course = z.infer<typeof CourseSchema>

export default CourseSchema;
