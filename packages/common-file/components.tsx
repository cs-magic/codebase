import Image from "next/image"
import { IUploadFile } from "../common-oss/schema"
import { AspectRatio } from "../common-ui-shadcn/components/aspect-ratio"
import { FlexContainer } from "../common-ui/components/flex-container"
import { Loading } from "../common-ui/components/loading"

export const FileComp = ({ file }: { file: IUploadFile }) => {
  return (
    <div className={"w-full"}>
      <AspectRatio ratio={1}>
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
          <Image src={file.data} alt={file.input.name} fill sizes={"320px"} />
        )
      }
      return <div>uploaded {file.input.name}</div>
  }
}
