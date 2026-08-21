import { z } from 'zod'

export const BranchSchema = z.object({
  id: z.string().nullish(),
  name: z.string(),
  slug: z.string(),
  country: z.string().nullish(),
  state: z.string().nullish(),
  city: z.string().nullish(),
  lng: z.number().nullish(),
  lat: z.number().nullish(),
  tel: z.string().nullish(),
  academyId: z.string(),
})

export type Location = z.infer<typeof BranchSchema>

export default BranchSchema
