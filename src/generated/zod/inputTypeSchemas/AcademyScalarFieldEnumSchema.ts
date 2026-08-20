import { z } from 'zod';

export const AcademyScalarFieldEnumSchema = z.enum(['id','name','description','tel','createdAt','updatedAt']);

export default AcademyScalarFieldEnumSchema;
