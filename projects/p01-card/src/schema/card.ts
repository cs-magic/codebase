import { IUserSummary } from "@cs-magic/prisma/schema/user.summary";
import { $Enums, PlatformType } from "@prisma/client";
import { z } from "zod";
import {
  IWechatArticleComment,
  IWechatArticleStat,
} from "../../../../core/wechat/wxmp-article/detail/schema";
import { IArticleSummaryParsed } from "../../../../packages/llm/parse-summary";
import { LlmModelType } from "../../../../packages/llm/schema/providers";
import { FetchWxmpArticleDetailOptions } from "../../../../core/wechat/wxmp-article/fetch/schema";

export type ICardPlatform<T extends $Enums.PlatformType> =
  T extends typeof $Enums.PlatformType.wxmpArticle
    ? {
        sn: string | null; // 这个最重要
        __biz: string | null;
        mid: string | null;
        idx: string | null;
        chksm: string | null;
        stat?: IWechatArticleStat;
        comments?: IWechatArticleComment[];
      }
    : object;

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
  model?: {
    name?: string;
    temperature?: number;
    topP?: number;
  };
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
  // 1. cache
  withCache?: boolean;

  // 2. detail
  detail?: FetchWxmpArticleDetailOptions;

  // 3. extra
  stat?: {
    enabled?: boolean;
  };

  comments?: {
    enabled?: boolean;
  };
};

export type GenCardApproach = "frontend" | "backend";

export const cardPreviewEngineTypeSchema = z.enum([
  "html2image",
  "html2canvas",
  "modern-screenshot",
]);
export type CardPreviewEngineType = z.infer<typeof cardPreviewEngineTypeSchema>;

export type CardInnerPreview = {
  title: string;
  cover: IMedia;
  tags: string[];
  description: string;
  mindmap: string;
  model: {
    type: LlmModelType;
  };
  sourceUrl: string;
  platformType: PlatformType;
  author: IUserSummary;
  time: Date;
};

export type CardOuterPreview = {
  id: string;
  user: IUserSummary;
};

export type ICardPreview = {
  inner: CardInnerPreview;
  outer: CardOuterPreview;
};
