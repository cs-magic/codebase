import { z } from 'zod';

export const TaskScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','title','description','status','ownerId','notes','priority']);

export default TaskScalarFieldEnumSchema;
