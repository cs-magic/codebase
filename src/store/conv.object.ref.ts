import { getNewId } from "../../packages/common-algo/id"
import { IAppClient, IAppDetail } from "../schema/app.detail"
import {
  IConvDetail,
  IRequest,
  IResponse,
  IUpdateResponse,
} from "../schema/conv"
import { IContext } from "../schema/message"
import { forkApp } from "./app.utils"
import { ConvSchema } from "./conv.schema"

export const convRefObject: ConvSchema = {
  convs: [],
  conv: null,
  apps: [],
  appIndex: 0,

  get appId() {
    return convRefObject.apps[convRefObject.appIndex]?.clientId ?? null
  },

  get requests(): IRequest[] {
    return convRefObject.conv?.requests ?? []
  },

  get requestId() {
    return convRefObject.conv?.id ?? null
  },

  get request() {
    return (
      convRefObject.requests.find((r) => r.id === convRefObject.requestId) ??
      null
    )
  },

  get responses(): IResponse[] {
    return convRefObject.request?.responses ?? []
  },

  get commonContext(): IContext {
    return convRefObject.request?.context ?? []
  },

  get responding() {
    return convRefObject.responses?.some((r) => !!r.tStart && !r.tEnd)
  },

  get bestResponse() {
    return convRefObject.responses[convRefObject.appIndex] ?? null
  },

  get bestContext(): IContext {
    return convRefObject.bestResponse
      ? [
          ...convRefObject.commonContext,
          {
            content:
              convRefObject.bestResponse?.error ??
              convRefObject.bestResponse?.content ??
              // todo: null?
              "",
            role: "assistant",
            isError: !!convRefObject.bestResponse?.error,
            updatedAt: convRefObject.bestResponse?.updatedAt,
          },
        ]
      : convRefObject.commonContext
  },

  initAppsFromServer(apps: IAppDetail[]) {
    console.log("-- this: ", this)
    convRefObject.apps = apps
      .filter((a) => a.id === "gpt-3.5-turbo")
      .map(forkApp)
    console.log("-- initAppsFromServer: ", {
      apps,
      thisApps: convRefObject.apps,
    })
    convRefObject.appIndex = 0
  },

  initConvFromServer(conv: IConvDetail) {
    convRefObject.conv = conv
  },

  updateRequestId(requestId: string | null) {
    const responses =
      convRefObject.conv?.requests.find((r) => r.id === requestId)?.responses ??
      []
    convRefObject.apps = responses.map((r) => ({
      ...r.app,
      response: r,
      isDraft: false,
      clientId: getNewId(),
    }))
  },

  selectApp(appClientId: string) {
    convRefObject.appIndex = convRefObject.apps.findIndex(
      (a) => a.clientId === appClientId,
    )
  },

  pushApp(app: IAppDetail) {
    convRefObject.apps.push(forkApp(app))
  },

  replaceApp(appClientId: string, app: IAppDetail) {
    const index = convRefObject.apps.findIndex(
      (a) => a.clientId === appClientId,
    )
    if (index < 0) return
    convRefObject.apps[index] = forkApp(app)
  },

  forkApp(app: IAppClient) {
    const index = convRefObject.apps.findIndex(
      (a) => a.clientId === app.clientId,
    )
    if (index < 0) return
    convRefObject.apps.splice(index + 1, 0, forkApp(app))
  },

  delApp(appClientId: string) {
    const index = convRefObject.apps.findIndex(
      (a) => a.clientId === appClientId,
    )
    if (index < 0) return
    convRefObject.apps.splice(index, 1)
    convRefObject.appIndex = 0
  },

  updateAppResponse(
    requestId: string,
    appClientId: string,
    func: IUpdateResponse,
  ) {
    console.log({ requestId, appClientId })
    const conv = convRefObject.conv
    if (requestId !== conv?.currentRequestId) return
    const req = conv.requests.find((r) => r.id === requestId)
    // todo: appClientId ?
    const res = req?.responses.find((r) => r.appId === appClientId)
    if (!res) return
    func(res)
  },

  updateConvTitle(convId: string, func: IUpdateResponse) {
    console.log({ convId })
    const res = convRefObject.convs.find((c) => c.id === convId)?.titleResponse
    if (!res) return
    func(res)
  },
}
