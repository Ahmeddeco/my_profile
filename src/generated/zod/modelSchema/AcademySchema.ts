import { z } from 'zod';

/////////////////////////////////////////
// ACADEMY SCHEMA
/////////////////////////////////////////

export const AcademySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  tel: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Academy = z.infer<typeof AcademySchema>

export default AcademySchema;
