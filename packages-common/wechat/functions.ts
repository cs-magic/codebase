import { api } from "@cs-magic/common/deps/api-client/api"

import { WECHAT_API_URL } from "./config"
import { isWechatError } from "./schema"

/**
 * wrapper 微信的各个 auth 接口
 * @param name
 * @param path
 * @param params
 */
export const fetchWechatApi = async <T>(
  name: string,
  path: string,
  params: Record<string, string>,
) => {
  const { data } = await api.get(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `${WECHAT_API_URL}${path}?${new URLSearchParams(params)}`,
  )
  console.log(`[wechat-api] fetched ${name}: `, data)
  if (isWechatError(data)) throw data.errmsg
  return data as T
}
