import { z } from 'zod';
import { BatchStatusSchema } from '../inputTypeSchemas/BatchStatusSchema'

/////////////////////////////////////////
// COURSE BATCH SCHEMA
/////////////////////////////////////////

export const CourseBatchSchema = z.object({
  status: BatchStatusSchema,
  id: z.string(),
  courseId: z.string(),
  locationId: z.string(),
  startAt: z.date(),
  endAt: z.date().nullish(),
  capacity: z.number().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type CourseBatch = z.infer<typeof CourseBatchSchema>

export default CourseBatchSchema;
