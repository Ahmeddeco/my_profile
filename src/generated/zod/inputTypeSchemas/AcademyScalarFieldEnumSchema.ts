import { z } from 'zod';

export const AcademyScalarFieldEnumSchema = z.enum(['id','name','slug','description','logo','tel','createdAt','updatedAt','userId']);

export default AcademyScalarFieldEnumSchema;
