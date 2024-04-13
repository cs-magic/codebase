import { LangType } from "@/schema/wechat-user"
import { BackendType } from "../../common-llm/schema/llm"
import { LlmModelType } from "../../common-llm/schema/providers"
import { getConvTable } from "../utils/get-conv-table"
import { getConvPreference } from "../utils/get-conv-preference"
import { BaseManager } from "./base.manager"

export class BasicManager extends BaseManager {
  async setModel(value: LlmModelType) {
    const preference = await getConvPreference(this.message)
    await getConvTable(this.message).update({
      where: {
        id: this.convId,
      },
      data: {
        preference: {
          ...preference,
          model: value,
        },
      },
    })
    await this.standardReply(`模型更新成功：${preference.model} --> ${value}`)
  }

  async setBackend(value: BackendType) {
    const preference = await getConvPreference(this.message)
    await getConvTable(this.message).update({
      where: {
        id: this.convId,
      },
      data: {
        preference: {
          ...preference,
          backend: value,
        },
      },
    })
    await this.standardReply(`后端更新成功：${preference.backend} --> ${value}`)
  }

  async setLang(value: LangType) {
    const preference = await getConvPreference(this.message)
    await getConvTable(this.message).update({
      where: {
        id: this.convId,
      },
      data: {
        preference: {
          ...preference,
          lang: value,
        },
      },
    })
    await this.standardReply(`语言更新成功：${preference.lang} --> ${value}`)
  }
}
