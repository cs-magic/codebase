import { toast } from "sonner"
import { api } from "../common-api"
import { IApi } from "../common-api/schema"
import { getOssSignatureUrl } from "./server/actions"

export const uploadFile = async (file: File) => {
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
  return fileUrl
}

export const uploadFiles = async (files: FileList): Promise<IApi<string[]>> => {
  const images = await Promise.all(
    Object.values(files).map(async (file) => uploadFile(file)),
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
