"use server"

import { env } from "@/env"
/**
 * `yarn add @alicloud/dysmsapi20170525@2.0.24`
 * ref: https://api.aliyun.com/api/Dysmsapi/2017-05-25/SendSms?params={%22PhoneNumbers%22:%2217766091857%22,%22SignName%22:%22%E8%AE%A1%E7%AE%97%E6%9C%BA%E9%AD%94%E6%B3%95%E7%A0%94%E7%A9%B6%22,%22TemplateCode%22:%22SMS_462000847%22,%22TemplateParam%22:%22%7B%5C%22code%5C%22%3A%5C%22654321%5C%22%7D%22}&tab=DEMO&lang=TYPESCRIPT&accounttraceid=ec0a9e4d8711471c83ea1ac2c172097ecmxf
 */
import Dysmsapi, {
  SendMessageWithTemplateRequest,
} from "@alicloud/dysmsapi20180501"
import * as Client from "@alicloud/openapi-client"
import { RuntimeOptions } from "@alicloud/tea-util"

const initClient = () =>
  new Dysmsapi(
    new Client.Config({
      // 必填，您的 AccessKey ID
      accessKeyId: env.ALI_AK,
      // 必填，您的 AccessKey Secret
      accessKeySecret: env.ALI_SK,
      // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
      endpoint: `dysmsapi.aliyuncs.com`,
    }),
  )

export const $sendSmsViaAli = async (phone: string, code: string) => {
  const client = initClient()

  const sendSmsRequest = new SendMessageWithTemplateRequest({
    phoneNumbers: phone,
    signName: "计算机魔法研究",
    templateCode: "SMS_462000847",
    templateParam: JSON.stringify({ code }),
    to: "亲爱的你",
    from: "南川",
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
    const res = await client.sendMessageWithTemplateWithOptions(
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
