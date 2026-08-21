import { z } from 'zod';

/////////////////////////////////////////
// BRANCH SCHEMA
/////////////////////////////////////////

export const BranchSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  country: z.string().nullish(),
  state: z.string().nullish(),
  city: z.string().nullish(),
  lat: z.number().nullish(),
  lng: z.number().nullish(),
  tel: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  academyId: z.string(),
})

export type Branch = z.infer<typeof BranchSchema>

export default BranchSchema;
