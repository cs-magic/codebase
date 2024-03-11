import { api } from "../../packages/common-trpc/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from "../../packages/common-ui/shadcn/shadcn-components/select"
import { IAppClient } from "../schema/app.detail"
import { core } from "../store/core.valtio"

export const ConvAppTitleLine = ({ app }: { app: IAppClient }) => {
  const { data: apps } = api.core.listApps.useQuery()

  // const replaceApp = useConvStore.use.replaceApp()
  // const { replaceApp } = useAtomValue(convAtomStore)

  return (
    <div className={"flex items-center gap-2 overflow-hidden"}>
      <Select
        onValueChange={(value) => {
          core.replaceApp(app.clientId, apps!.find((a) => a.id === value)!)
        }}
      >
        <SelectTrigger className={"focus:ring-0 gap-2 w-40 overflow-hidden"}>
          <span className={"truncate"}>{app.title}</span>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>官方 App</SelectLabel>

            <SelectSeparator />

            {!apps ? (
              <div className={"animate-spin h-8 w-full"} />
            ) : (
              apps.map((a) => {
                return (
                  <SelectItem value={a.id} key={a.id}>
                    {a.title}
                  </SelectItem>
                )
              })
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <span className={"text-xs"}>{app.clientId}</span>
    </div>
  )
}
