import { z } from 'zod';
import { RoleSchema } from '../inputTypeSchemas/RoleSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
