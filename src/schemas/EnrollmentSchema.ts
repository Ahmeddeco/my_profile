import { z } from 'zod'

export const EnrollmentSchema = z.object({
  id: z.string().nullish(),
  userId: z.string(),
  batchId: z.string(),
  price: z.number(),
})

export type Enrollment = z.infer<typeof EnrollmentSchema>

export default EnrollmentSchema
