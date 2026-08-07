import { z } from 'zod';

export const ArticleScalarFieldEnumSchema = z.enum(['id','titleAr','titleEn','descriptionAr','descriptionEn','slug','topicAr','topicEn','mainImage','images','createdAt','updatedAt','userId']);

export default ArticleScalarFieldEnumSchema;
