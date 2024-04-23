import last from "lodash/last"

export const sampleWxmpArticleUrls = [
  "https://mp.weixin.qq.com/s/HdVZGKjViUVe1bd9v17ANQ",

  `https://mp.weixin.qq.com/s/QPmU5JQt4JeSC2UpFyKjPw`,

  `https://mp.weixin.qq.com/s?__biz=Mzk0NTYzNDQ5NQ==&amp;mid=2247489081&amp;idx=1&amp;sn=aee974da3c779724e14d696f56e5aaa3&amp;chksm=c3133be9f464b2ff29beeb25445a0122dc2bebfe15b3dab9645a35e327582fd6bb8d82f58bc0&amp;mpshare=1&amp;scene=1&amp;srcid=0420kPkYDU8MwWwmwp2Vpzw2&amp;sharer_shareinfo=78759ff0d3165b92a3a404d7899f48fd&amp;sharer_shareinfo_first=78759ff0d3165b92a3a404d7899f48fd#rd`,

  `http://mp.weixin.qq.com/s?__biz=MTg1MjI3MzY2MQ==&amp;mid=2652247168&amp;idx=1&amp;sn=4802e698849828bd5f54d0334191eaa5&amp;chksm=5dba30126acdb904c84742d0e34584fcce3be4f56119046358ee906b98840c78a548df998f56&amp;mpshare=1&amp;scene=1&amp;srcid=0420d0WGUDNOtXVPj4GKt7DW&amp;sharer_shareinfo=95acacbf04326966270c151343deb393&amp;sharer_shareinfo_first=95acacbf04326966270c151343deb393#rd`,

  "http://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&amp;mid=2650915283&amp;idx=1&amp;sn=9b16363de3bad3bb7f66ba0698139861&amp;chksm=84e405adb3938cbb88b181664700d24f1078d40f16b87676c37ca0b75bb6867ad143abc2c3fe&amp;mpshare=1&amp;scene=1&amp;srcid=0420bMhrbKsaIwL5Fj6KHwU0&amp;sharer_shareinfo=1c30ed29ba57c91d8917befd4ca1586c&amp;sharer_shareinfo_first=1c30ed29ba57c91d8917befd4ca1586c#rd",
]
export const sampleWxmpArticleUrl = last(sampleWxmpArticleUrls)!

export const sampleWxmpArticleComment = {
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
