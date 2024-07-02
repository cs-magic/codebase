import { Prisma } from "@prisma/client";
export declare const cardDetailSchema: {};
export type ICardDetail = Prisma.CardGetPayload<typeof cardDetailSchema>;
export declare const cardLlmResponseSchema: {};
export type ICardLlmResponse = Prisma.LlmResponseGetPayload<typeof cardLlmResponseSchema>;
