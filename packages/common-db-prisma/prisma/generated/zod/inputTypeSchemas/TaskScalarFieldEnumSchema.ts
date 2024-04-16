import { z } from 'zod';

export const TaskScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','title','description','status','ownerId']);

export default TaskScalarFieldEnumSchema;
