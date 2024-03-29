import { api } from "../../../../common-api"

export const fetchWechatContent = async (url: string) => {
  const { data } = await api.get<string>(url)
  console.log("-- fetchWechatContent: ", data)
  return data
}
