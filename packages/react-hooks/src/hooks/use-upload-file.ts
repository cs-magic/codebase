import { IUploadFile } from "@cs-magic/common"
import { uploadFile } from "@cs-magic/common/server"
import { useState } from "react"

export const useUploadFile = () => {
  const [status, setStatus] = useState<IUploadFile>({ status: "idle" })

  const upload = async (file: File) => {
    setStatus({ status: "running", input: file })
    const result = await uploadFile(file)
    setStatus({ status: "finished", input: file, ...result })
  }

  return { status, upload }
}

export const useUploadFiles = ({
  onUploadChange,
}: {
  onUploadChange?: (index: number, file: IUploadFile) => void
}) => {
  const [isUploading, setUploading] = useState(false)

  const upload = async (files: FileList | File[]) => {
    setUploading(true)
    const items = Object.values(files)

    void Promise.all(
      items.map(async (file, index) => {
        if (onUploadChange)
          onUploadChange(index, { status: "running", input: file })
        const result = await uploadFile(file)
        if (onUploadChange)
          onUploadChange(index, { status: "finished", input: file, ...result })
      }),
    ).finally(() => {
      setUploading(false)
    })
  }

  return { upload, isUploading }
}
