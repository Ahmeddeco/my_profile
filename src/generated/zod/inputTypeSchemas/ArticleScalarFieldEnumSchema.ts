import { z } from 'zod';

export const ArticleScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt']);

export default ArticleScalarFieldEnumSchema;
