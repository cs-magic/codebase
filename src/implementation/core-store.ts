import { remove } from "lodash"
import { UnexpectedError } from "../../packages/common-general/schema"
import { LogLevel } from "../../packages/common-log/schema"
import { IAppClient, IAppDetail } from "../schema/app.detail"
import { IConvBase } from "../schema/conv.base"
import { IConvDetail } from "../schema/conv.detail"
import { IContext } from "../schema/message"
import { IRequest } from "../schema/request"
import { IResponse, IUpdateResponse } from "../schema/response"
import { forkApp } from "../utils"

export class CoreStore {
  // implements ICoreStore
  //////////////////////////////
  // base states
  //////////////////////////////

  convs: IConvBase[] = []
  _appIndex = 0
  logLevel: LogLevel = LogLevel.warning

  _conv: IConvDetail | null = null

  //////////////////////////////
  // derived
  //////////////////////////////

  get conv() {
    const conv = this._conv
    if (this.logLevel <= LogLevel.debug) console.log({ conv })
    return conv
  }

  set conv(conv: IConvDetail | null) {
    this._conv = conv
    if (this.logLevel <= LogLevel.info) console.log("-- setting conv: ", conv)
  }

  get convId() {
    return this.conv?.id ?? null
  }

  get apps(): IAppClient[] {
    return this.responses.map((r) => ({
      ...r.app,
      clientId: r.appClientId,
      response: r,
      isDraft: false, // todo
    }))
  }

  get app(): IAppClient | null {
    return this.apps[this._appIndex] ?? null
  }

  get appId() {
    return this.app?.id ?? null
  }

  get appClientId() {
    return this.app?.clientId ?? null
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
    return this.responses[this._appIndex] ?? null
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

  updateRequestId(requestId: string) {
    const conv = this.convs.find((c) => c.id === this.convId)
    if (!conv) return
    conv.currentRequestId = requestId
  }

  updateRequestFromServer(request: IRequest) {
    if (this.conv?.id === request.convId) {
      this.conv.currentRequestId = request.id
      this.conv.requests.push(request)
    }
    const conv = this.convs.find((c) => c.id === request.convId)
    if (conv) conv.currentRequestId = request.id
  }

  addConvFromServer(conv: IConvDetail) {
    this.convs.splice(0, 0, conv)
  }

  initConvFromServer(conv: IConvDetail, requestId?: string | null) {
    const convInStore = this.convs.find((c) => c.id === conv.id)
    if (!convInStore) throw new UnexpectedError()
    this.conv = conv
    if (requestId !== undefined) convInStore.currentRequestId = requestId
  }

  selectApp(appClientId: string) {
    this._appIndex = this.apps.findIndex((a) => a.clientId === appClientId)
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
    this._appIndex = 0
  }

  updateAppResponse(
    requestId: string,
    appClientId: string,
    func: IUpdateResponse,
  ) {
    if (this.logLevel <= LogLevel.debug) console.log({ requestId, appClientId })

    /**
     * v1: get response from $.conv.request.response[i]
     */
    // const conv = this.conv
    // if (requestId !== conv?.currentRequestId) return
    // const res = conv.requests
    //   .find((r) => r.id === requestId)
    //   ?.responses.find((r) => r.appClientId === appClientId)
    // if (!res) return

    /**
     * v2: get response from $.apps[i].response
     */
    const res = this.apps.find((a) => a.clientId === appClientId)?.response
    // console.log({ requestId, appClientId, res })
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

  delConv(convId: string) {
    if (convId === this.convId) {
      this._conv = null
      this._appIndex = 0
    }
    remove(this.convs, (c) => c.id === convId)
  }

  delAllConvs() {
    this.convs = []
    this._appIndex = 0
    this._conv = null
  }

  /**
   *  返回到首页
   */
  returnToHome() {
    this.conv = null
  }
}
