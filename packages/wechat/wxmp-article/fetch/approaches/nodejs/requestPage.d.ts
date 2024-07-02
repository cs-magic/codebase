import { Prisma } from "@prisma/client";
import { BackendType } from "@cs-magic/llm/schema/llm.base";
export type RequestApproachType = "api" | "simulate";
export type RequestOptions = {
    backendType?: BackendType;
    approach?: {
        type?: RequestApproachType;
        headless?: boolean;
    };
};
export declare const requestPage: (url: string, options?: RequestOptions) => Promise<Prisma.CardUncheckedCreateInput>;
