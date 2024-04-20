import { z } from 'zod';

export const CardScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','user','platformType','platformId','platformData','sourceUrl','author','time','title','description','cover','images','iFrames','videos','html','contentMd','contentSummary','stat','ossUrl']);

export default CardScalarFieldEnumSchema;
