import { IFetchWechatArticleStat } from "../schema";
/**
 *
 * @param url e.g. http://mp.weixin.qq.com/s?__biz=MzUyMjE2MTE0Mw==&amp;amp;mid=2247502028&amp;amp;idx=1&amp;amp;sn=3ebc7f9c0eb3f5e923264dc8ed161ffd&amp;amp;chksm=f9d29654cea51f420c101f5457361e8a8ab651d41ac348454b9bbba5996511d7a8a70ce76f66&amp;amp;mpshare=1&amp;amp;scene=1&amp;amp;srcid=0329vTzpUpk0iiwottscnUas&amp;amp;sharer_shareinfo=2a8c8c1fe3a0a89e41026c269c85a588&amp;amp;sharer_shareinfo_first=aa952e98fa239975bb8c6271bd4d54dc#rd
 */
export declare const parseStatFromUrlMock: (url: string) => IFetchWechatArticleStat | null;
export declare const fetchWechatArticleStat: ({ key, uin, idx, mid, sn, __biz, is_only_read, }: IFetchWechatArticleStat) => Promise<any>;
