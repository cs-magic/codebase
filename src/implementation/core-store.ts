import { LogLevel } from "../../packages/common-log/schema"
import { IAppClient, IAppDetail } from "../schema/app.detail"
import { IConvBase } from "../schema/conv.base"
import { IConvDetail } from "../schema/conv.detail"
import { ICoreStore } from "../schema/core.store"
import { IContext } from "../schema/message"
import { IRequest } from "../schema/request"
import { IResponse, IUpdateResponse } from "../schema/response"
import { forkApp } from "../utils"

export class CoreStore implements ICoreStore {
  //////////////////////////////
  // base states
  //////////////////////////////

  convs: IConvBase[] = []
  appIndex = 0

  // persisted
  _appsDefault: IAppClient[] = []
  _appsInConv: IAppClient[] = []
  logLevel: LogLevel = LogLevel.warning

  _conv: IConvDetail | null = null

  get conv() {
    const conv = this._conv
    if (this.logLevel <= LogLevel.debug) console.log({ conv })
    return conv
  }

  set conv(conv: IConvDetail | null) {
    this._conv = conv
    if (this.logLevel <= LogLevel.info) console.log("-- setting conv: ", conv)
  }

  //////////////////////////////
  // derived states
  //////////////////////////////

  get apps() {
    return this._appsInConv.length ? this._appsInConv : this._appsDefault
  }

  get convId() {
    return this.conv?.id ?? null
  }

  get appId() {
    return this.apps[this.appIndex]?.clientId ?? null
  }

  get requests(): IRequest[] {
    const requests = this.conv?.requests ?? []
    if (this.logLevel <= LogLevel.debug) console.log({ requests })
    return requests
  }

  get requestIds(): string[] {
    return this.requests.map((r) => r.id)
  }

  /**
   * 当前的 requestId, title 都是从 convs 里找
   */
  get requestId() {
    const requestId =
      this.convs.find((c) => c.id === this.convId)?.currentRequestId ?? null
    if (this.logLevel <= LogLevel.debug) console.log({ requestId })
    return requestId
  }

  get request() {
    const request = this.requests.find((r) => r.id === this.requestId) ?? null
    if (this.logLevel <= LogLevel.debug) console.log({ request })
    return request
  }

  get responses(): IResponse[] {
    return this.request?.responses ?? []
  }

  get commonContext(): IContext {
    const commonContext = this.request?.context ?? []
    if (this.logLevel <= LogLevel.info) {
      console.log({ thisLogLevel: this.logLevel })
      console.log({ commonContext })
    }
    return commonContext
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
    this._appsDefault = apps
      .filter((a) => a.id === "gpt-3.5-turbo")
      .map(forkApp)
    this.appIndex = 0
  }

  initConvFromServer(conv: IConvDetail) {
    this.conv = conv
    if (this.responses.length)
      this._appsInConv = this.responses.map((r) => forkApp(r.app))
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
    if (this.logLevel <= LogLevel.debug) console.log({ requestId, appClientId })
    const conv = this.conv
    if (requestId !== conv?.currentRequestId) return
    const req = conv.requests.find((r) => r.id === requestId)
    // todo: appClientId ?
    const res = req?.responses.find((r) => r.appId === appClientId)
    if (!res) return
    func(res)
  }

  updateConvTitle(convId: string, func: IUpdateResponse) {
    if (this.logLevel <= LogLevel.debug)
      console.log("-- updateConvTitle: ", { convId })
    const res = this.convs.find((c) => c.id === convId)?.titleResponse
    if (!res) return
    func(res)
  }
}
