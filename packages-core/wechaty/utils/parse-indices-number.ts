import { ERR_MSG_INVALID_INPUT } from "@cs-magic/common/const"
import { z } from "zod"
import { Priority } from "../handlers/handle-message/plugins/task.plugin"

export const parseIndex = async (input: string) => {
  const m = /^\s*(\d+)\s*(.*?)\s*$/.exec(input)

  if (!m) throw new Error(ERR_MSG_INVALID_INPUT)

  const index = await z.number().parseAsync(Number(m[1]))

  const reason = await z.string().parseAsync(m[2])

  return { index, reason }
}

export const parseTimer = async (input: string) => {
  const m = /^\s*(\d+)\s*(.*?)\s*$/.exec(input)

  if (!m) throw new Error(ERR_MSG_INVALID_INPUT)

  const index = await z.number().parseAsync(Number(m[1]))

  const timer = await z.string().parseAsync(m[2])

  return { index, timer }
}

export const parsePriorities = async (input: string) => {
  const m = /^\s*((?:\d+\s*)+)(\d+)\s*$/.exec(input)

  if (!m) throw new Error(ERR_MSG_INVALID_INPUT)

  const indices = await z
    .number()
    .array()
    .min(1)
    .parseAsync(m[1]?.trim().split(/\s+/).map(Number))

  const priority = (await z
    .number()
    .int()
    .min(1)
    .max(9)
    .parseAsync(Number(m[2]))) as Priority

  return { indices, priority }
}

export const parseIndicesStatus = async (input: string) => {
  const m = /^\s*((?:\d+\s*)+)(\S+)\s*$/.exec(input)

  if (!m) throw new Error(ERR_MSG_INVALID_INPUT)

  const indices = m[1]?.trim().split(/\s+/).map(Number)

  const status = await z.string().min(1).parseAsync(m[2])

  return { indices, status }
}
