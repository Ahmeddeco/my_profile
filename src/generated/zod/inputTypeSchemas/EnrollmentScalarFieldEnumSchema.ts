import { z } from 'zod';

export const EnrollmentScalarFieldEnumSchema = z.enum(['id','userId','groupId','price','status','createdAt']);

export default EnrollmentScalarFieldEnumSchema;
