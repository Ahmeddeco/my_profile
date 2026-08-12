import { z } from 'zod';

export const BatchStatusSchema = z.enum(['UPCOMING','OPEN','FULL','STARTED','COMPLETED','CANCELLED']);

export type BatchStatusType = `${z.infer<typeof BatchStatusSchema>}`

export default BatchStatusSchema;
