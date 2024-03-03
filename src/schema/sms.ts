import { z } from "zod"

import { validatePhone } from "@/lib/utils"

export const sendSmsSchema = z.object({
  phone: z.string().refine(validatePhone, "手机号格式不合法"),
  name: z.string().refine((s) => s.length > 0, "至少要有一个字"),
})
export type ISendSms = z.infer<typeof sendSmsSchema>

export const smsSignInSchema = sendSmsSchema.and(
  z.object({
    code: z.string().refine((s) => /\d{6}/.test(s), "验证码格式不合法"),
  }),
)
export type ISmsSignIn = z.infer<typeof smsSignInSchema>
