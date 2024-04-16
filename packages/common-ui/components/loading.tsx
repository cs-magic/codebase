"use client"

import { useAtom } from "jotai"
import { LoaderIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogContent,
} from "../../common-ui-shadcn/components/alert-dialog"
import { uiLoadingAlertDialogAtom } from "../store"
import { FlexContainer } from "./flex-container"

export const Loading = () => (
  <FlexContainer>
    <LoaderIcon className={"animate-spin"} />
  </FlexContainer>
)

export const LoadingAlertDialog = () => {
  const [loading] = useAtom(uiLoadingAlertDialogAtom)
  // console.log("LoadingAlertDialog: ", { loading })

  return (
    <AlertDialog open={loading}>
      <AlertDialogContent
        className={
          "flex items-center justify-center bg-transparent border-none"
        }
      >
        <Loading />
      </AlertDialogContent>
    </AlertDialog>
  )
}
