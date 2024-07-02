import { Prisma } from "@prisma/client";
import { z } from "zod";
export declare const taskStatusSchema: z.ZodEnum<["pending", "running", "paused", "done", "discarded"]>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type TaskTimer = {
    startDate: Date;
    disabled?: boolean;
} & ({
    period: number;
} | {
    weekdays: number[];
});
export declare const taskDetailSchema: {
    include: {
        conv: true;
    };
};
export type ITaskDetail = Prisma.TaskGetPayload<typeof taskDetailSchema>;
