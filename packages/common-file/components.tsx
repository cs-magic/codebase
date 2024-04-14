import { Check, CircleCheckBigIcon } from "lucide-react"
import Image from "next/image"
import { HTMLAttributes } from "react"
import { IUploadFile } from "../../packages/common-oss/schema"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { FlexContainer } from "../../packages/common-ui/components/flex-container"
import { Loading } from "../../packages/common-ui/components/loading"

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
      return "idle"

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
