import { z } from 'zod';

export const EnrollmentScalarFieldEnumSchema = z.enum(['id','userId','batchId','price','createdAt']);

export default EnrollmentScalarFieldEnumSchema;
