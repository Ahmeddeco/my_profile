import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','email','emailVerified','image','role']);

export default UserScalarFieldEnumSchema;
