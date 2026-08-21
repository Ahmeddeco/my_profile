import BatchStatusSchema from "@/generated/zod/inputTypeSchemas/BatchStatusSchema"
import { z } from 'zod'

export const GroupSchema = z.object({
  id: z.string().nullish(),
  code: z.string().nullish(),
  slug: z.string().nullish(),
  title: z.string(),
  status: BatchStatusSchema,
  courseId: z.string(),
  branchId: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  capacity: z.number().nullish(),
  price: z.number().nullish(),
})

export type Group = z.infer<typeof GroupSchema>

export default GroupSchema
