import { toast } from "sonner"
import { v4 } from "uuid"
import { api } from "../common-api"
import { IApi } from "../common-api/schema"
import { getOssSignatureUrl } from "./server/actons"

export const uploadFiles = async (files: FileList): Promise<IApi<string[]>> => {
  // todo: cleaner approach
  const isHttps = location.href.includes("https")

  const images = await Promise.all(
    Object.values(files).map(async (file) => {
      let signatureUrl = await getOssSignatureUrl(v4())

      if (isHttps) signatureUrl = signatureUrl.replace("http://", "https://")

      await api.post(signatureUrl, {
        headers: new Headers({
          "Content-Type": "image/png",
        }),
        body: file,
      })

      return signatureUrl.split("?")[0] ?? signatureUrl
    }),
  )

  console.log("response: ", images)
  if (images.every((s) => !!s)) {
    toast.success("上传成功！")
    return { success: true, data: images }
  } else {
    toast.error("上传失败！")
    return { success: false, data: images }
  }
}
