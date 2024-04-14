import { z } from 'zod';

export const TaskStatusSchema = z.enum(['pending','running','paused','done','discarded']);

export type TaskStatusType = `${z.infer<typeof TaskStatusSchema>}`

export default TaskStatusSchema;
