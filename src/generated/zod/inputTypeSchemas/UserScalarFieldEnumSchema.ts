import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','email','emailVerified','image','role','lat','lng','mobile','city','state','country']);

export default UserScalarFieldEnumSchema;
