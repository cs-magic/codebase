"use server"

import { env } from "@/env"
/**
 * `yarn add @alicloud/dysmsapi20170525@2.0.24`
 * ref: https://next.api.aliyun.com/api-tools/sdk/Dysmsapi?version=2017-05-25&language=nodejs-tea
 */
import Dysmsapi, * as Api from "@alicloud/dysmsapi20170525"
import { Config } from "@alicloud/openapi-client"
import { RuntimeOptions } from "@alicloud/tea-util"

const aliSmsConfig = {
  ak: env.ALI_AK,
  sk: env.ALI_SK,
  // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
  endpoint: `dysmsapi.aliyuncs.com`,
  signName: "计算机魔法研究",
  templateCode: "SMS_462000847",
  to: "亲爱的你",
  from: "南川",
}

const initClient = () =>
  new Dysmsapi(
    new Config({
      accessKeyId: aliSmsConfig.ak,
      accessKeySecret: aliSmsConfig.sk,
      endpoint: aliSmsConfig.endpoint,
    }),
  )

export const $sendSmsViaAli = async (phone: string, code: string) => {
  const client = initClient()

  const sendSmsRequest = new Api.SendSmsRequest({
    phoneNumbers: phone,
    signName: aliSmsConfig.signName,
    templateCode: aliSmsConfig.templateCode,
    templateParam: JSON.stringify({ code }),
  })
  try {
    console.log("[sms] sending: ", { phone, code })
    // 复制代码运行请自行打印 API 的返回值
    // const res = true
    // await sleep(1000)

    /**
     * {
     *   statusCode: 200,
     *   body: SendSmsResponseBody {
     *     bizId: '532323708714267957^0',
     *     code: 'OK',
     *     message: 'OK',
     *     requestId: '441F81AC-3C53-56E3-8FB7-008901536C23'
     *   }
     * }
     */
    const res = await client.sendSmsWithOptions(
      sendSmsRequest,
      new RuntimeOptions({}),
    )
    console.log("[sms] sent result: ", res)
    return res.statusCode === 200 && res.body.code === "OK"
  } catch (err) {
    console.log("[sms] sent error: ", err)
    return false
  }
}
