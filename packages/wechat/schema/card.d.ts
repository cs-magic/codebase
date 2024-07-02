import { IUserSummary } from "@cs-magic/prisma/schema/user.summary";
import { $Enums, PlatformType } from "@prisma/client";
import { z } from "zod";
import { LlmModelType } from "@cs-magic/llm/schema/llm.models";
import { IArticleSummaryParsed } from "@cs-magic/common/schema/query";
import { IWechatArticleComment, IWechatArticleStat } from "../wxmp-article/detail/schema";
import { FetchWxmpArticleDetailOptions } from "../wxmp-article/fetch/schema";
export type ICardPlatform<T extends $Enums.PlatformType = any> = T extends typeof $Enums.PlatformType.wxmpArticle ? {
    sn: string | null;
    __biz: string | null;
    mid: string | null;
    idx: string | null;
    chksm: string | null;
    stat?: IWechatArticleStat;
    comments?: IWechatArticleComment[];
} : object;
export type ICardStat = {
    reads?: number;
    likes?: number;
    comments?: number;
};
export type IMedia = {
    url: string;
    ratio?: number;
};
export type ISummaryParsed = {
    result?: IArticleSummaryParsed;
    title?: string;
    description?: string;
    mindmap?: string;
    tags?: string[];
    comment?: string;
};
export type Action1Type = "generate" | "reset";
export type Action2Type = "copy" | "download" | "upload";
export type ActionType = Action1Type | Action2Type;
export type GenWxmpArticleCardFetchOptions = {
    withCache?: boolean;
    detail?: FetchWxmpArticleDetailOptions;
    stat?: {
        enabled?: boolean;
    };
    comments?: {
        enabled?: boolean;
    };
    watermark?: {
        text?: string;
    };
};
export type GenCardApproach = "frontend" | "backend";
export declare const cardPreviewEngineTypeSchema: z.ZodEnum<["html2image", "html2canvas", "modern-screenshot"]>;
export type CardPreviewEngineType = z.infer<typeof cardPreviewEngineTypeSchema>;
export type ICardInnerPreview = {
    id: string | null;
    title: string | null;
    cover: IMedia | null;
    sourceUrl: string | null;
    platformType: PlatformType | null;
    author: IUserSummary | null;
    time: Date | null;
    summary: {
        parsed: ISummaryParsed;
        model: LlmModelType;
    } | null;
};
export type CardOuterPreview = {
    id: string | null;
    user: IUserSummary | null;
};
export type ICardPreview = {
    inner: ICardInnerPreview | null;
    outer: CardOuterPreview | null;
};
