import { z } from "zod";
export declare const messageRoleSchema: z.ZodUnion<[z.ZodLiteral<"user">, z.ZodLiteral<"assistant">, z.ZodLiteral<"system">, z.ZodLiteral<"function">]>;
export type RoleType = z.infer<typeof messageRoleSchema>;
/**
 * ref: https://platform.openai.com/docs/api-reference/chat/create#chat-create-messages
 */
export declare const llmMessageSchema: z.ZodObject<{
    content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"text">;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "text";
        text: string;
    }, {
        type: "text";
        text: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"image_url">;
        image_url: z.ZodObject<{
            url: z.ZodString;
            detail: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            detail?: string | undefined;
        }, {
            url: string;
            detail?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "image_url";
        image_url: {
            url: string;
            detail?: string | undefined;
        };
    }, {
        type: "image_url";
        image_url: {
            url: string;
            detail?: string | undefined;
        };
    }>]>, "many">]>;
    role: z.ZodUnion<[z.ZodLiteral<"user">, z.ZodLiteral<"assistant">, z.ZodLiteral<"system">, z.ZodLiteral<"function">]>;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    content: string | ({
        type: "text";
        text: string;
    } | {
        type: "image_url";
        image_url: {
            url: string;
            detail?: string | undefined;
        };
    })[];
    role: "function" | "user" | "assistant" | "system";
    name?: string | undefined;
}, {
    content: string | ({
        type: "text";
        text: string;
    } | {
        type: "image_url";
        image_url: {
            url: string;
            detail?: string | undefined;
        };
    })[];
    role: "function" | "user" | "assistant" | "system";
    name?: string | undefined;
}>;
export type ILlmMessage = z.infer<typeof llmMessageSchema>;
export type IMessageInChat = ILlmMessage & {
    updatedAt?: Date;
    isError?: boolean;
};
export type IContext = IMessageInChat[];
