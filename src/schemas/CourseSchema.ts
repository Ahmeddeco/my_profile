import FieldSchema from "@/generated/zod/inputTypeSchemas/FieldSchema"
import { z } from 'zod'

export const CourseSchema = z.object({
  field: FieldSchema,
  id: z.string().nullish(),
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
  fieldId: z.string(),
  instructorId: z.string(),
})

export type Course = z.infer<typeof CourseSchema>

export default CourseSchema
