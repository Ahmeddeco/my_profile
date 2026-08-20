import { z } from 'zod';

export const EnrollmentStatusSchema = z.enum(['PENDING','CONFIRMED','CANCELLED','REFUNDED']);

export type EnrollmentStatusType = `${z.infer<typeof EnrollmentStatusSchema>}`

export default EnrollmentStatusSchema;
