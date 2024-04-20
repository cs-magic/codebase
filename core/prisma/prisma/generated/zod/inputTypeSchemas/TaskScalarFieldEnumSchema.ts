import { z } from 'zod';

export const TaskScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','title','description','status','ownerId','roomId','notes','priority','timer']);

export default TaskScalarFieldEnumSchema;
