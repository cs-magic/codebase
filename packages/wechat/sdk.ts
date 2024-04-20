import {
  getWechatSignature,
  getWechatTicket,
  getWechatToken,
} from "./notify/functions"
import { IWechatSDKToken } from "./schema"

export class WechatSDK {
  private token?: IWechatSDKToken
  private ticket?: {
    value: string
    time: number // seconds
    expires_in: number
  }

  private async getToken() {
    if (!this.token) this.token = await getWechatToken()
    return this.token.access_token
  }

  private async _getTicket() {
    const access_token = await this.getToken()

    if (
      !this.ticket ||
      Date.now() / 1000 - this.ticket.time >= this.ticket.expires_in
    ) {
      const { ticket, expires_in } = await getWechatTicket(access_token)
      this.ticket = {
        value: ticket,
        time: Date.now() / 1000,
        expires_in,
      }
    }
    return this.ticket.value
  }

  public async getSignature(url: string) {
    const ticket = await this._getTicket()
    return getWechatSignature(ticket, url)
  }
}
