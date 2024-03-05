import { atom } from "jotai"
import { IMessageInChat } from "../schema/message"
import { requestAtom } from "./request"

export const getAppContextAtom = atom((get) => (appID: string) => {
  const request = get(requestAtom)

  // 1. 先获取最近一次请求里的上下文
  const context = [...(request?.context ?? [])] as IMessageInChat[]
  // console.log({ context })

  // 2. 再拼接回复里的内容
  const content = request?.responses.find((r) => r.appId === appID)?.response
  // console.log({ content })
  if (content)
    context.push({
      role: "assistant",
      content,
      updatedAt: new Date(),
      isError: false,
    })
  // console.log({ contextFinal: context })
  return context
})
