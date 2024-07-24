import { api, IApiResult } from "../api/index.js"
import { OSS_DOMAIN } from "./const.js"
import { getOssSignatureUrl } from "./server/actions.js"

/**
 * based on ali oss, ref: https://help.aliyun.com/zh/oss/user-guide/resize-images-4
 * @param ossKeyWithSuffix
 * @param width
 * @param height
 */
export const getOssUrl = (
  ossKeyWithSuffix: string,
  params?: { width?: number; height?: number },
) => {
  if (!/^(?:\/|http)/.test(ossKeyWithSuffix)) {
    ossKeyWithSuffix = OSS_DOMAIN + ossKeyWithSuffix
  }

  const width = params?.width
  const height = params?.height

  let prefix = ""
  if (width && height) {
    prefix += "?x-oss-process=image/resize,"
    // 最常用，固定画幅
    if (width && height) prefix += `m_fill,h_${height},w_${width}`
    // 瀑布流需要，宽相等，高可变
    else if (width) prefix += `m_lfit，w_${width}`
    //     不常用，高相等，宽可变
    else if (height) prefix += `m_lfit，h_${height}`
  }

  return ossKeyWithSuffix + prefix
}

// void checkOssObjectExists("p01/card/image.jpg").then(console.log)
export const uploadFile = async (file: File): Promise<IApiResult<string>> => {
  try {
    let signatureUrl = await getOssSignatureUrl(file.name)

    const isHttps = location.href.includes("https")
    if (isHttps) signatureUrl = signatureUrl.replace("http://", "https://")

    console.log("-- uploading fileUrl: ", signatureUrl)
    await api.put(signatureUrl, file, {
      headers: {
        "Content-Type": "image/png",
      },
    })

    const fileUrl = signatureUrl.split("?")[0] ?? signatureUrl
    console.log("-- uploaded fileUrl: ", fileUrl)
    return { success: true, data: fileUrl }
  } catch (error: any) {
    // 检查 error 对象是否包含 message 属性
    // 如果有 axios 响应信息（error.response），可以进一步提取信息
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred"
    return { success: false, message }
  }
}
