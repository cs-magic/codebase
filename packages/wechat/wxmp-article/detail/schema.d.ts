import { sampleWxmpArticleComment } from "@cs-magic/common/sample";
export type IFetchWechatArticleStat = {
    uin: string;
    key: string;
    __biz: string;
    mid: string;
    sn: string;
    idx: "1";
    is_only_read: "1";
};
export type IWechatArticleStat = {
    readnum: number;
    likenum: number;
    oldlikenum: number;
    comment_count: number;
    biz: string;
};
export type IWechatArticleComment = typeof sampleWxmpArticleComment;
