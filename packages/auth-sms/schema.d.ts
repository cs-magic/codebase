import { z } from "zod";
/**
 * 用户短信发送在form里需要的信息
 */
export declare const sendSmsSchema: z.ZodObject<{
    phone: z.ZodEffects<z.ZodString, any, string>;
}, "strip", z.ZodTypeAny, {
    phone?: any;
}, {
    phone: string;
}>;
export type ISendSms = z.infer<typeof sendSmsSchema>;
/**
 * 调用短信服务商所需要的接口信息
 */
export type IProviderSendSms = (phone: string, code: string, expireMinutes: number) => Promise<boolean>;
export declare const smsSignInSchema: z.ZodIntersection<z.ZodObject<{
    phone: z.ZodEffects<z.ZodString, any, string>;
}, "strip", z.ZodTypeAny, {
    phone?: any;
}, {
    phone: string;
}>, z.ZodObject<{
    code: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    code: string;
}, {
    code: string;
}>>;
export type ISmsSignIn = z.infer<typeof smsSignInSchema>;
export declare const profileUpdateSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    image: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    image: string;
    id: string;
}, {
    name: string;
    image: string;
    id: string;
}>;
export type IProfileUpdate = z.infer<typeof profileUpdateSchema>;
/**
 * sms basic
 */
export type SmsStage = "toSendSms" | "toAuth";
export type SmsProviderType = "tencent" | "ali";
