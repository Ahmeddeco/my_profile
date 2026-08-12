import { z } from 'zod';

export const FieldSchema = z.enum(['web','mobile','marketing','interior_design','automation','ai']);

export type FieldType = `${z.infer<typeof FieldSchema>}`

export default FieldSchema;
