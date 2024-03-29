import { IApi } from "../../../common-api/schema"

export type IFetchWechatArticleStat = {
  // query
  uin: string
  key: string
  __biz: string

  // form
  mid: string
  sn: string
  idx: "1" // todo ?
  is_only_read: "1"
}

export type IWechatArticleStat = {
  readnum: number
  likenum: number
  oldlikenum: number
  comment_count: number
  biz: string
}

export const wechatArticleCommentSample = {
  author_like_status: 0,
  content:
    "陶大程在优必选的时候就看出来了他不是专注于学术的学术份子，而是那种人精",
  content_id: "471573716745061642",
  create_time: 1711494056,
  id: 2,
  identity_type: 0,
  ip_wording: {
    city_id: "",
    city_name: "",
    country_id: "156",
    country_name: "中国",
    province_id: "",
    province_name: "广东",
  },
  is_from_friend: 0,
  is_from_me: 0,
  is_top: 0,
  like_id: 0,
  like_num: 64,
  like_status: 0,
  logo_url:
    "http://mmsns.qpic.cn/mmsns/iaxNB5XaibCeLTYWIUGCYm7cS1kFxTx4ibUSEBZJ6VnOdXPDItJ9PaGRg/0",
  my_id: 1290,
  nick_name: "物湖",
  openid: "o7Sk462miPeT2hsTz_RvxzITiDg4",
  reply_new: {
    max_reply_id: 7,
    reply_list: [
      {
        author_like_status: 0,
        content: "现在就是这种钻营的人才能生存下去，而且越来越滋润。",
        create_time: 1711498623,
        identity_type: 0,
        ip_wording: {
          city_id: "",
          city_name: "",
          country_id: "156",
          country_name: "中国",
          province_id: "",
          province_name: "河南",
        },
        is_deleted: 0,
        is_from: 3,
        is_from_friend: 0,
        logo_url:
          "http://mmsns.qpic.cn/mmsns/iaxNB5XaibCeLTYWIUGCYm7cS1kFxTx4ibUSEBZJ6VnOdXPDItJ9PaGRg/0",
        nick_name: "未命名用户",
        openid: "o7Sk467pijtbmpxCYGehcuDxZMvY",
        reply_del_flag: 0,
        reply_id: 1,
        reply_is_elected: 1,
        reply_like_num: 55,
        reply_like_status: 0,
      },
    ],
    reply_total_cnt: 6,
  },
  segment: {
    end_offset: 0,
    start_offset: 0,
  },
}

export type IWechatArticleComment = typeof wechatArticleCommentSample

export type IWechatArticleDetail = {
  stat: IWechatArticleStat | null
  comments: IWechatArticleComment[] | null
}

export type FetchWechatArticleDetail = (
  url: string,
) => Promise<IApi<IWechatArticleDetail>>
