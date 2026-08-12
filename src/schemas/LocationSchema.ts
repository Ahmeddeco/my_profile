import { z } from 'zod'

export const LocationSchema = z.object({
  id: z.string().nullish(),
  nameAr: z.string(),
  nameEn: z.string(),
  country: z.string().nullish(),
  state: z.string().nullish(),
  city: z.string().nullish(),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
})

export type Location = z.infer<typeof LocationSchema>

export default LocationSchema
