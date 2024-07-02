import { SummaryOptions } from "./approaches/nodejs/md2summary";
import { RequestOptions } from "./approaches/nodejs/requestPage";
export type FetchWxmpArticleDetailOptions = {
    request?: RequestOptions;
    summary?: SummaryOptions;
};
