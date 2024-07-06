import { Check } from "lucide-react"
import Image from "next/image"
import { HTMLAttributes } from "react"

import { IUploadFile } from "../oss/schema.js"
import { AspectRatio } from "../ui-shadcn/components/ui/aspect-ratio.js"
import { cn } from "../ui-shadcn/utils.js"
import { FlexContainer } from "../ui/components/flex-container.js"
import { Loading } from "../ui/components/loading.js"

export const FileComp = ({
  file,
  className,
  ...props
}: { file: IUploadFile } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("w-full", className)} {...props}>
      <AspectRatio ratio={1} className={"relative"}>
        <FileCompInner file={file} />
      </AspectRatio>
    </div>
  )
}

const FileCompInner = ({ file }: { file: IUploadFile }) => {
  switch (file.status) {
    case "idle":
      return <span>idle</span>

    case "running":
      return <Loading />

    case "finished":
      if (!file.success)
        return (
          <FlexContainer orientation={"vertical"}>
            <div>{file.input.name}</div>
            <div>upload failed</div>
          </FlexContainer>
        )
      if (file.input.type.startsWith("image")) {
        return (
          <>
            <Image src={file.data} alt={file.input.name} fill sizes={"320px"} />
            <Check className={"text-green-500 absolute right-0 top-0"} />
          </>
        )
      }
      return <div>uploaded {file.input.name}</div>
  }
}
