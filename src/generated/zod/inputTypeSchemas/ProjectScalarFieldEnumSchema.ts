import { z } from 'zod';

export const ProjectScalarFieldEnumSchema = z.enum(['id','slug','titleAr','titleEn','miniDescriptionAr','miniDescriptionEn','descriptionAr','descriptionEn','url','mainImage','images','type','createdAt','updatedAt','userId']);

export default ProjectScalarFieldEnumSchema;
