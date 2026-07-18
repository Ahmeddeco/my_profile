import { z } from 'zod';

export const ProjectScalarFieldEnumSchema = z.enum(['id','title','miniDescription','description','mainImage','images','type','createdAt','updatedAt','userId']);

export default ProjectScalarFieldEnumSchema;
