import { useAtom } from "jotai"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from "../../packages/common-ui/shadcn/shadcn-components/select"
import { api } from "../../packages/common-trpc/react"
import { IAppDetail } from "../schema/app.detail"
import { replaceAppAtom } from "../store/app"

export const ConvAppTitleLine = ({ app }: { app: IAppDetail }) => {
  const { data: apps } = api.core.listApps.useQuery()
  const [, replaceApp] = useAtom(replaceAppAtom)

  return (
    <div className={"flex items-center gap-2 overflow-hidden"}>
      <Select
        onValueChange={(value) => {
          replaceApp(app.id, apps!.find((a) => a.id === value)!)
        }}
      >
        <SelectTrigger
          className={"focus-visible:ring-0 gap-2 w-40 overflow-hidden"}
        >
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

      <span className={"text-xs"}>{app.id}</span>
    </div>
  )
}
