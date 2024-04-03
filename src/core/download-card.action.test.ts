import { downloadCardAction } from "./download-card.action"
const url =
  "http://mp.weixin.qq.com/s?__biz=MjM5NTg2NTU0Ng==&amp;amp;mid=2656649406&amp;amp;idx=2&amp;amp;sn=2776ecf380618499eba48c48c53420b5&amp;amp;chksm=bd5c161b8a2b9f0d202daf5123e15c7d26d0a2a174033065646b5bd943a54fe6d4be69536976&amp;amp;mpshare=1&amp;amp;scene=1&amp;amp;srcid=03318sBIWHugl6Uh9mcshryy&amp;amp;sharer_shareinfo=9990a8b71e147df733d809bb760a8607&amp;amp;sharer_shareinfo_first=9990a8b71e147df733d809bb760a8607#rd"

// describe("download actions", () => {
//   it("should download multiple", async () => {
//
//     await Promise.all(
//       [url, url].map(async (url, index) => {
//         console.log("downloading: ", index)
//         await downloadCardAction(url, undefined, "playwright")
//         console.log("downloaded: ", index)
//       }),
//     )
//   })
// })

void downloadCardAction(url, undefined, "playwright")
