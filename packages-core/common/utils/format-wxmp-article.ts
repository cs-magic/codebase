/**
 * 压缩微信链接长度，以保证二维码足够短
 *
 * @param options
 */
export const formatWxmpUrl = (options: {
  __biz: string
  mid: string
  idx: string
  sn: string
  chksm: string
}) => {
  const url = new URL("https://mp.weixin.qq.com/s#rd")
  Object.entries(options).forEach(([key, val]) => {
    url.searchParams.set(key, val)
  })
  return url.href
}
