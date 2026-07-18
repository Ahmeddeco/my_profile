import { z } from 'zod'


export const ProjectSchema = z.object({
  id: z.string().nullish(),
  title: z.string(),
  miniDescription: z.string(),
  description: z.string(),
  mainImage: z.string(),
  images: z.string().array(),
  createdAt: z.date(),
  userId: z.string(),
})

export type Project = z.infer<typeof ProjectSchema>

export default ProjectSchema
