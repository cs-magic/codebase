import { IWechatArticleStat } from "../schema";
type IWxapiResponse<T> = {
    code: number;
    msg: string;
    data?: T;
};
/**
 * {"code":-1002,"msg":"无此用户","list":[]}
 *
 * @param url
 */
export declare const fetchWechatArticleStat: (id: string) => Promise<IWxapiResponse<IWechatArticleStat>>;
export declare const fetchWechatArticleComments: (id: string) => Promise<IWxapiResponse<{
    author_like_status: number;
    content: string;
    content_id: string;
    create_time: number;
    id: number;
    identity_type: number;
    ip_wording: {
        city_id: string;
        city_name: string;
        country_id: string;
        country_name: string;
        province_id: string;
        province_name: string;
    };
    is_from_friend: number;
    is_from_me: number;
    is_top: number;
    like_id: number;
    like_num: number;
    like_status: number;
    logo_url: string;
    my_id: number;
    nick_name: string;
    openid: string;
    reply_new: {
        max_reply_id: number;
        reply_list: {
            author_like_status: number;
            content: string;
            create_time: number;
            identity_type: number;
            ip_wording: {
                city_id: string;
                city_name: string;
                country_id: string;
                country_name: string;
                province_id: string;
                province_name: string;
            };
            is_deleted: number;
            is_from: number;
            is_from_friend: number;
            logo_url: string;
            nick_name: string;
            openid: string;
            reply_del_flag: number;
            reply_id: number;
            reply_is_elected: number;
            reply_like_num: number;
            reply_like_status: number;
        }[];
        reply_total_cnt: number;
    };
    segment: {
        end_offset: number;
        start_offset: number;
    };
}[]>>;
export {};
