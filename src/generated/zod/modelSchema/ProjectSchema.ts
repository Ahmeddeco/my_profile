import { z } from 'zod';
import { ProductTypeSchema } from '../inputTypeSchemas/ProductTypeSchema'

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  type: ProductTypeSchema,
  id: z.string(),
  title: z.string(),
  miniDescription: z.string(),
  description: z.string(),
  mainImage: z.string(),
  images: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export type Project = z.infer<typeof ProjectSchema>

export default ProjectSchema;
