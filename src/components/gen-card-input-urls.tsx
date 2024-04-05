import { useAtom } from "jotai"
import { CheckIcon, MinusCircleIcon } from "lucide-react"
import React from "react"
import { Button } from "../../packages/common-ui-shadcn/components/button"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { config } from "../config/system"
import { cardInputUrlsAtom } from "../store/card.atom"

export const GenCardInputUrls = () => {
  const [items, setItems] = useAtom(cardInputUrlsAtom)

  const addNewUrl = () =>
    setItems((items) => {
      items.push({ url: "", disabled: false })
    })

  return (
    <>
      <LabelLine title={"Url"}>
        <div className={"flex flex-col gap-2 p-2"}>
          {items.map((item, index) => {
            return (
              <div className={"w-full flex items-center gap-2"} key={index}>
                <Input
                  key={index}
                  id={"card-input-url"}
                  placeholder={config.card.genInputPlaceHolder}
                  className={"grow"}
                  value={item.url}
                  onChange={(event) =>
                    setItems((items) => {
                      items[index]!.url = event.currentTarget.value
                    })
                  }
                />

                <CheckIcon
                  onClick={() => {
                    setItems((items) => {
                      items[index]!.disabled = !items[index]!.disabled
                    })
                  }}
                  className={cn(
                    item.disabled
                      ? "text-muted-foreground"
                      : "text-primary-foreground",
                  )}
                />

                <MinusCircleIcon
                  className={"shrink-0 text-destructive-foreground/50 "}
                  onClick={() => {
                    setItems((urls) => urls.filter((u, i) => i !== index))
                  }}
                />
              </div>
            )
          })}
          <Button onClick={addNewUrl} variant={"outline"}>
            Add New Url
          </Button>
        </div>
      </LabelLine>
    </>
  )
}
