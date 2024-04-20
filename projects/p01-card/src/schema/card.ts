import { $Enums } from "@prisma/client";
import { z } from "zod";
import {
  IWechatArticleComment,
  IWechatArticleStat,
} from "../../../../packages/wechat/wxmp-article/detail/schema";
import { FetchWxmpArticleDetailOptions } from "../../../../packages/wechat/wxmp-article/fetch/approaches/nodejs";
import { IArticleSummaryParsed } from "../../../../packages/llm/parse-summary";

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

export type GenCardRenderType = "frontend" | "backend";

export const cardPreviewEngineTypeSchema = z.enum([
  "html2image",
  "html2canvas",
  "modern-screenshot",
]);
export type CardPreviewEngineType = z.infer<typeof cardPreviewEngineTypeSchema>;
