import { parseWxmpArticleUrl } from "@cs-magic/p01-card/src/core/card-platform/wechat-article/utils";
import { LlmModelType } from "../../common-llm/schema/providers";
import { findWxmpArticle } from "./find-wxmp-article";

const f = async (url: string, model: LlmModelType) => {
  await findWxmpArticle(parseWxmpArticleUrl(url), model);
};

void f(process.argv[2]!, (process.argv[3] ?? "gpt-3.5-turbo") as LlmModelType);
