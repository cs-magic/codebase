import { fetchWxmpArticleDetail, fetchWxmpArticleStat } from "./crawl"

void fetchWxmpArticleDetail(
  // 1. ok
  // "http://mp.weixin.qq.com/s?__biz=MzUyMjE2MTE0Mw==&amp;amp;mid=2247502028&amp;amp;idx=1&amp;amp;sn=3ebc7f9c0eb3f5e923264dc8ed161ffd&amp;amp;chksm=f9d29654cea51f420c101f5457361e8a8ab651d41ac348454b9bbba5996511d7a8a70ce76f66&amp;amp;mpshare=1&amp;amp;scene=1&amp;amp;srcid=0329vTzpUpk0iiwottscnUas&amp;amp;sharer_shareinfo=2a8c8c1fe3a0a89e41026c269c85a588&amp;amp;sharer_shareinfo_first=aa952e98fa239975bb8c6271bd4d54dc#rd",

  "http://mp.weixin.qq.com/s?__biz=Mzk0NjMyNjUwOQ==&amp;amp;mid=2247484723&amp;amp;idx=1&amp;amp;sn=2efa4943789512d4bd59b1683184c479&amp;amp;chksm=c3069bb1f47112a7231415b88cbe5b97916e1de945758a0ab1fa0ce3b54de43ebd6e11eb5a6b&amp;amp;mpshare=1&amp;amp;scene=1&amp;amp;srcid=0329eWEbNP5bn0DqENZbwLbq&amp;amp;sharer_shareinfo=f11bad693062ba0d297d83cc07bb0c8c&amp;amp;sharer_shareinfo_first=f11bad693062ba0d297d83cc07bb0c8c#rd",

  // 3. fail (助手号)
  // "http://mp.weixin.qq.com/s?__biz=MzkzNjMzNTM4NQ==&amp;amp;mid=2247490407&amp;amp;idx=1&amp;amp;sn=f30a923d418a2761a8a6fb08081c34f0&amp;amp;chksm=c2a11a11f5d69307d18ef8c457da03ef41f479b9104134c827a3c216117e10943b2ae1630b66&amp;amp;mpshare=1&amp;amp;scene=1&amp;amp;srcid=0329eiKNsc7wtwSNUxqUumLQ&amp;amp;sharer_shareinfo=d7d3738534771b65844607b9a95d0806&amp;amp;sharer_shareinfo_first=d7d3738534771b65844607b9a95d0806#rd",
)

// void fetchWxmpArticleStat()
