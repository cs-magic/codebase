"use client"

import { useAtom } from "jotai"
import { LoaderIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogContent,
} from "../../ui-shadcn/components/ui/alert-dialog.jsx"
import { uiLoadingAlertDialogAtom } from "../store.js"
import { FlexContainer } from "./flex-container.js"

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
