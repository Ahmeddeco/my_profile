import { z } from 'zod';

export const LocationScalarFieldEnumSchema = z.enum(['id','nameAr','nameEn','country','state','city','latitude','longitude','tel','createdAt','updatedAt']);

export default LocationScalarFieldEnumSchema;
