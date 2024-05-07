import { formatWxmpUrl } from "./utils/format-wxmp-article"

it("should ", () => {
  expect(
    formatWxmpUrl({ __biz: "1", chksm: "2", idx: "3", mid: "4", sn: "5" }),
  ).toBe(`https://mp.weixin.qq.com/s?__biz=1&chksm=2&idx=3&mid=4&sn=5#rd`)
})
