import { z } from 'zod';

export const GroupScalarFieldEnumSchema = z.enum(['id','code','slug','title','courseId','startAt','endAt','capacity','price','status','createdAt','updatedAt','branchId']);

export default GroupScalarFieldEnumSchema;
