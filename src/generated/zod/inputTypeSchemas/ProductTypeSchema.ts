import { z } from 'zod';

export const ProductTypeSchema = z.enum(['web','mobile','ai']);

export type ProductTypeType = `${z.infer<typeof ProductTypeSchema>}`

export default ProductTypeSchema;
