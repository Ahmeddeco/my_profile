import { z } from 'zod'

export const AcademySchema = z.object({
  id: z.string().nullish(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  logo: z.string().nullish(),
  tel: z.string(),
  userId: z.string().nullish(),
})

export type Academy = z.infer<typeof AcademySchema>

export default AcademySchema
