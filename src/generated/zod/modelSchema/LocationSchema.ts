import { z } from 'zod';

/////////////////////////////////////////
// LOCATION SCHEMA
/////////////////////////////////////////

export const LocationSchema = z.object({
  id: z.string(),
  nameAr: z.string(),
  nameEn: z.string(),
  country: z.string().nullish(),
  state: z.string().nullish(),
  city: z.string().nullish(),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  tel: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Location = z.infer<typeof LocationSchema>

export default LocationSchema;
