import { z } from "zod"

export const basicCommands = z.union([
  z.literal(""),
  z.literal("ding"),
  z.literal("help"),
  z.literal("帮助"),
  z.literal("status"),
  z.literal("状态"),
  z.literal("list-models"),
  z.literal("查询模型列表"),
  z.literal("set-model"),
  z.literal("设置模型"),
  z.literal("set-backend"),
  z.literal("设置后端"),
  z.literal("set-lang"),
  z.literal("设置语言"),
])
