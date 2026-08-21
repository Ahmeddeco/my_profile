import { z } from 'zod';

export const BranchScalarFieldEnumSchema = z.enum(['id','name','slug','country','state','city','lat','lng','tel','createdAt','updatedAt','academyId']);

export default BranchScalarFieldEnumSchema;
