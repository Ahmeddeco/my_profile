import RoleSchema from "@/generated/zod/inputTypeSchemas/RoleSchema"
import { z } from 'zod'


export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().nullish(),
  name: z.string(),
  email: z.string(),
  mobile: z.string().nullish(),
  image: z.string().nullish(),
  lat: z.string().nullish(),
  lng: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema
