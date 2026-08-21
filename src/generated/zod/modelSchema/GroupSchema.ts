import { z } from 'zod';
import { BatchStatusSchema } from '../inputTypeSchemas/BatchStatusSchema'

/////////////////////////////////////////
// GROUP SCHEMA
/////////////////////////////////////////

export const GroupSchema = z.object({
  status: BatchStatusSchema,
  id: z.string(),
  code: z.string(),
  slug: z.string().nullish(),
  title: z.string(),
  courseId: z.string(),
  startAt: z.date(),
  endAt: z.date().nullish(),
  capacity: z.number().nullish(),
  price: z.number().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  branchId: z.string(),
})

export type Group = z.infer<typeof GroupSchema>

export default GroupSchema;
