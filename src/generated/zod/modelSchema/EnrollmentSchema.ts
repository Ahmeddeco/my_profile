import { z } from 'zod';
import { EnrollmentStatusSchema } from '../inputTypeSchemas/EnrollmentStatusSchema'

/////////////////////////////////////////
// ENROLLMENT SCHEMA
/////////////////////////////////////////

export const EnrollmentSchema = z.object({
  status: EnrollmentStatusSchema,
  id: z.string(),
  userId: z.string(),
  groupId: z.string(),
  price: z.number(),
  createdAt: z.date(),
})

export type Enrollment = z.infer<typeof EnrollmentSchema>

export default EnrollmentSchema;
