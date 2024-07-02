import { Card, LlmResponse } from "@prisma/client";
import { GenWxmpArticleCardFetchOptions } from "../../schema/card";
export type FetchWxmpArticleRes = {
    article: Card;
    llmResponse: LlmResponse;
};
export declare const fetchWxmpArticle: (url: string, options?: GenWxmpArticleCardFetchOptions) => Promise<FetchWxmpArticleRes>;
