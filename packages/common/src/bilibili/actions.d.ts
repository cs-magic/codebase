import { IApiResult } from "../api-client/schema";
import { IBilibiliVideoDetail } from "./schema";
export declare const getBilibiliSummary: (bvid: string) => Promise<any>;
/**
 * @param url e.g. https://b23.tv/sbodfSp
 */
export declare const fetchBvidFromb23tv: (url: string) => Promise<IApiResult<string>>;
export declare const fetchBilibiliDetail: (bvid: string) => Promise<IApiResult<IBilibiliVideoDetail>>;
