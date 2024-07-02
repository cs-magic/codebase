import { z } from "zod";
import { validatePhone } from "./validation";
/**
 * 用户短信发送在form里需要的信息
 */
export const sendSmsSchema = z.object({
    phone: z.string().refine(validatePhone, "手机号格式不合法"),
});
export const smsSignInSchema = sendSmsSchema.and(z.object({
    code: z.string().refine((s) => /\d{6}/.test(s), "验证码格式不合法"),
}));
export const profileUpdateSchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
});
