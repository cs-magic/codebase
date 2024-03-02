import { uiState } from "@/store/ui"

export const useAlertDialog = () => {
  return (content: string) => {
    uiState.alertDialog = {
      open: true,
      content,
    }
  }
}
