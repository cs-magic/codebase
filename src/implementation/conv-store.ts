import { forkApp } from "../utils"
import { getNewId } from "../../packages/common-algo/id"
import { IAppClient, IAppDetail } from "../schema/app.detail"
import {
  IConvBase,
  IConvDetail,
  IRequest,
  IResponse,
  IUpdateResponse,
} from "../schema/conv"
import { IContext } from "../schema/message"
import { IConvStore } from "../schema/conv-store"

export class ConvStore implements IConvStore {
  //////////////////////////////
  // base states
  //////////////////////////////

  convs: IConvBase[] = []
  conv: IConvDetail | null = null
  apps: IAppClient[] = []
  appIndex = 0

  //////////////////////////////
  // derived states
  //////////////////////////////

  get convId() {
    return this.conv?.id ?? null
  }

  get appId() {
    return this.apps[this.appIndex]?.clientId ?? null
  }

  get requests(): IRequest[] {
    return this.conv?.requests ?? []
  }

  get requestId() {
    return this.conv?.id ?? null
  }

  get request() {
    return this.requests.find((r) => r.id === this.requestId) ?? null
  }

  get responses(): IResponse[] {
    return this.request?.responses ?? []
  }

  get commonContext(): IContext {
    return this.request?.context ?? []
  }

  get responding() {
    return this.responses?.some((r) => !!r.tStart && !r.tEnd)
  }

  get bestResponse() {
    return this.responses[this.appIndex] ?? null
  }

  get bestContext(): IContext {
    return this.bestResponse
      ? [
          ...this.commonContext,
          {
            content:
              this.bestResponse?.error ??
              this.bestResponse?.content ??
              // todo: null?
              "",
            role: "assistant",
            isError: !!this.bestResponse?.error,
            updatedAt: this.bestResponse?.updatedAt,
          },
        ]
      : this.commonContext
  }

  //////////////////////////////
  // actions
  //////////////////////////////

  initAppsFromServer(apps: IAppDetail[]) {
    console.log("-- this: ", this)
    this.apps = apps.filter((a) => a.id === "gpt-3.5-turbo").map(forkApp)
    console.log("-- initAppsFromServer: ", { apps, thisApps: this.apps })
    this.appIndex = 0
  }

  initConvFromServer(conv: IConvDetail) {
    this.conv = conv
  }

  updateRequestId(requestId: string | null) {
    const responses =
      this.conv?.requests.find((r) => r.id === requestId)?.responses ?? []
    this.apps = responses.map((r) => ({
      ...r.app,
      response: r,
      isDraft: false,
      clientId: getNewId(),
    }))
  }

  selectApp(appClientId: string) {
    this.appIndex = this.apps.findIndex((a) => a.clientId === appClientId)
  }

  pushApp(app: IAppDetail) {
    this.apps.push(forkApp(app))
  }

  replaceApp(appClientId: string, app: IAppDetail) {
    const index = this.apps.findIndex((a) => a.clientId === appClientId)
    if (index < 0) return
    this.apps[index] = forkApp(app)
  }

  forkApp(app: IAppClient) {
    const index = this.apps.findIndex((a) => a.clientId === app.clientId)
    if (index < 0) return
    this.apps.splice(index + 1, 0, forkApp(app))
  }

  delApp(appClientId: string) {
    const index = this.apps.findIndex((a) => a.clientId === appClientId)
    if (index < 0) return
    this.apps.splice(index, 1)
    this.appIndex = 0
  }

  updateAppResponse(
    requestId: string,
    appClientId: string,
    func: IUpdateResponse,
  ) {
    console.log({ requestId, appClientId })
    const conv = this.conv
    if (requestId !== conv?.currentRequestId) return
    const req = conv.requests.find((r) => r.id === requestId)
    // todo: appClientId ?
    const res = req?.responses.find((r) => r.appId === appClientId)
    if (!res) return
    func(res)
  }

  updateConvTitle(convId: string, func: IUpdateResponse) {
    console.log({ convId })
    const res = this.convs.find((c) => c.id === convId)?.titleResponse
    if (!res) return
    func(res)
  }
}
