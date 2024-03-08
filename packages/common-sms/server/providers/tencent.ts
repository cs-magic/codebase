"use server"
/**
 * `yarn add net tls`
 */
import { v20210111 } from "tencentcloud-sdk-nodejs-sms/tencentcloud/services/sms/v20210111"
import { env } from "@/env"

const tencentSmsConfig = {
  signName: "邢健的个人博客",
  appId: "1400518792",
  templateId: "2064119",
  endpoint: "sms.tencentcloudapi.com",
  region: "ap-beijing",
}

const smsTencentClient = new v20210111.Client({
  // 为了保护密钥安全，建议将密钥设置在环境变量中或者配置文件中，请参考本文凭证管理章节。
  // 硬编码密钥到代码中有可能随代码泄露而暴露，有安全隐患，并不推荐。
  credential: {
    secretId: env.TENCENT_AK,
    secretKey: env.TENCENT_SK,
  },
  // 产品地域
  region: tencentSmsConfig.region,
  // 可选配置实例
  profile: {
    httpProfile: {
      endpoint: tencentSmsConfig.endpoint,
      headers: {
        // 自定义 header
      },
      // proxy: "http://127.0.0.1:8899" // http请求代理
    },
  },
})

export const $sendSmsViaTencent = async (
  phone: string,
  code: string,
  expire: number,
) => {
  const params = {
    PhoneNumberSet: [phone],
    SmsSdkAppId: tencentSmsConfig.appId,
    SignName: tencentSmsConfig.signName,
    TemplateId: tencentSmsConfig.templateId,
    TemplateParamSet: [code, expire.toString()],
  }
  console.log("[sms-tencent] request: ", params)
  const res = await smsTencentClient.SendSms(params)
  console.log("[sms-tencent] response: ", res)

  const message = res?.SendStatusSet![0]!.Code
  return message === "Ok"
}
