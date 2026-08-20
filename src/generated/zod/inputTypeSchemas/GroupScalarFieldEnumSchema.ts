import { z } from 'zod';

export const GroupScalarFieldEnumSchema = z.enum(['id','courseId','startAt','endAt','capacity','price','status','createdAt','updatedAt','branchId']);

export default GroupScalarFieldEnumSchema;
