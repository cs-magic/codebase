import { produce } from "immer"
import { useState } from "react"
import { api } from "../common-api"
import { IApiResult } from "../common-api/schema"
import { UnexpectedError } from "../common-general/schema"
import { IUploadFile } from "./schema"
import { getOssSignatureUrl } from "./server/actions"

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

export const useUploadFile = () => {
  const [status, setStatus] = useState<IUploadFile>({ status: "idle" })

  const upload = async (file: File) => {
    setStatus({ status: "running", input: file })
    const result = await uploadFile(file)
    setStatus({ status: "finished", input: file, ...result })
  }

  return { status, upload }
}

export const useUploadFiles = () => {
  const [status, setStatus] = useState<IUploadFile[]>([])

  const upload = async (files: FileList | File[]) => {
    const items = Object.values(files)
    setStatus(items.map((item) => ({ status: "running", input: item })))
    await Promise.all(
      items.map(async (item, index) => {
        const result = await uploadFile(item)
        setStatus((status) =>
          produce(status, (status) => {
            const item = status[index]!
            if (item.status !== "running") throw new UnexpectedError()
            status[index] = { status: "finished", input: item.input, ...result }
          }),
        )
      }),
    )
  }

  return { status, upload }
}
