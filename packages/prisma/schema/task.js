import { Prisma } from "@prisma/client";
import { z } from "zod";
export const taskStatusSchema = z.enum([
    "pending",
    "running",
    "paused",
    "done",
    "discarded",
]);
export const taskDetailSchema = Prisma.validator()({
    include: {
        conv: true,
    },
});
