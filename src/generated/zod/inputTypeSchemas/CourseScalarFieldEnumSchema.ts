import { z } from 'zod';

export const CourseScalarFieldEnumSchema = z.enum(['id','titleAr','titleEn','slug','descriptionAr','descriptionEn','detailsAr','detailsEn','price','discountAmount','mainImage','images','field','instructorId','createdAt','updatedAt']);

export default CourseScalarFieldEnumSchema;
