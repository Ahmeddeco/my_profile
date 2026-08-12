import BatchStatusSchema from "@/generated/zod/inputTypeSchemas/BatchStatusSchema"
import { z } from 'zod'

export const CourseBatchSchema = z.object({
  status: BatchStatusSchema,
  id: z.string().nullish(),
  courseId: z.string(),
  locationId: z.string(),
  startAt: z.date(),
  endAt: z.date().nullish(),
  capacity: z.number().nullish(),
})

export type CourseBatch = z.infer<typeof CourseBatchSchema>

export default CourseBatchSchema
