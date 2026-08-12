import { z } from 'zod';

export const CourseBatchScalarFieldEnumSchema = z.enum(['id','courseId','locationId','startAt','endAt','capacity','status','createdAt','updatedAt']);

export default CourseBatchScalarFieldEnumSchema;
