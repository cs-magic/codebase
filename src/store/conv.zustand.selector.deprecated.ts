import { IRequest, IResponse } from "../schema/conv"
import { IContext } from "../schema/message"
import { useConvStore } from "./conv.zustand.class.deprecated"

export const requests: IRequest[] = useConvStore.use.conv()?.requests ?? []
export const requestId = useConvStore.use.conv()?.id ?? null
export const request = requests.find((r) => r.id === requestId) ?? null

export const responses: IResponse[] = request?.responses ?? []

export const apps = useConvStore.use.apps()

export const appId = useConvStore.use.appId()

export const bestResponse = responses.find((r) => r.appId === appId) ?? null

export const commonContext: IContext = request?.context ?? []

export const bestContext = bestResponse
  ? [
      ...commonContext,
      {
        content: bestResponse.error ?? bestResponse.content,
        role: "assistant",
        isError: !!bestResponse.error,
        updatedAt: bestResponse.updatedAt,
      },
    ]
  : commonContext

export const responding = responses.some((r) => !!r.tStart && !r.tEnd)
