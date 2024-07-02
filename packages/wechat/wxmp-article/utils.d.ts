export declare const getWechatArticleUrlFromShortId: (shortId: string) => string;
export declare const parseWxmpArticleShortId: (url: string) => string | undefined;
export declare const parseWxmpArticleLongId: (url: string) => string | undefined;
/**
 * url-short: https://mp.weixin.qq.com/s/T2DpRlMxTSwYIPJm1ZYU6w
 * url-long: http://mp.weixin.qq.com/s?__biz=MjM5MjAyNDUyMA==&amp;mid=2650991323&amp;idx=1&amp;sn=35606561be8182e2dcf373bb22b3f42a&amp;chksm=bd5ad87c8a2d516ab07ad987b2678650e65c01ed5b7908e20d24a36e51263b9f20eb3f822ae8#rd
 * @param url
 */
export declare const ensureWxmpArticleLongId: (url: string) => Promise<string>;
