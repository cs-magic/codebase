"use client"

import MdEditor from "@uiw/react-md-editor"
import { useAtom } from "jotai"
import { useDrop } from "react-use"
import { FileComp } from "../../../../../packages/common-file/components"
import { useUploadFiles } from "../../../../../packages/common-oss/upload"
import { cn } from "../../../../../packages/common-ui-shadcn/utils"
import { ButtonWithLoading } from "../../../../../packages/common-ui/components/button-with-loading"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { cardNewContentAtom } from "../../../../store/card.atom"

export default function NewCardPage() {
  const [v, setV] = useAtom(cardNewContentAtom)
  const { status, upload } = useUploadFiles()

  const state = useDrop({
    onFiles: async (files) => {
      console.log("files", files)
      await upload(files)
    },
    onUri: (uri) => console.log("uri", uri),
    onText: (text) => console.log("text", text),
  })

  return (
    <FlexContainer
      className={cn(
        // "bg-cyan-950",
        " items-center",
      )}
    >
      <FlexContainer
        orientation={"vertical"}
        className={
          cn()
          // "max-w-[720px]"
          // "bg-cyan-700",
        }
      >
        {!!status.length && (
          <div className={"w-full flex items-center gap-2 "}>
            {status.map((item, index) => (
              <div
                key={index}
                className={"w-24 rounded-xl overflow-hidden border"}
              >
                <FileComp file={item} />
              </div>
            ))}
          </div>
        )}

        <MdEditor
          className={"w-full"}
          value={v}
          onChange={(v) => setV(v ?? "")}
        />

        <div className={"flex items-center w-full"}>
          <ButtonWithLoading className={"ml-auto"} size={"sm"} disabled={!v}>
            Submit
          </ButtonWithLoading>
        </div>
      </FlexContainer>
    </FlexContainer>
  )
}
