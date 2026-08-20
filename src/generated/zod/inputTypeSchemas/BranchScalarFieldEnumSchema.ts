import { z } from 'zod';

export const BranchScalarFieldEnumSchema = z.enum(['id','name','country','state','city','latitude','longitude','tel','createdAt','updatedAt','academyId']);

export default BranchScalarFieldEnumSchema;
