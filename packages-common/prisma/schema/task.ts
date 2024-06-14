import { Prisma } from "@prisma/client"
import { z } from "zod"

export const taskStatusSchema = z.enum([
  "pending",
  "running",
  "paused",
  "done",
  "discarded",
])
export type TaskStatus = z.infer<typeof taskStatusSchema>

export type TaskTimer = {
  startDate: Date
  disabled?: boolean
} & (
  | {
      period: number // ms, 0=one-time, k=period
    }
  | {
      weekdays: number[] // [0-6]
    }
)
export const taskDetailSchema = Prisma.validator<Prisma.TaskDefaultArgs>()({
  include: {
    conv: true,
  },
})
export type ITaskDetail = Prisma.TaskGetPayload<typeof taskDetailSchema>
