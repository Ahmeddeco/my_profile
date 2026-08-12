import { z } from 'zod';

/////////////////////////////////////////
// ENROLLMENT SCHEMA
/////////////////////////////////////////

export const EnrollmentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  batchId: z.string(),
  price: z.number(),
  createdAt: z.date(),
})

export type Enrollment = z.infer<typeof EnrollmentSchema>

export default EnrollmentSchema;
