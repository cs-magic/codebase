"use client"

import { produce } from "immer"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useEffect, useState } from "react"
import { useCopyToClipboard } from "react-use"
import { ApiMethod } from "@cs-magic/common"
import { sleep } from "@cs-magic/common"
import { Button } from "@cs-magic/common"
import { Input } from "@cs-magic/common"
import { Label } from "@cs-magic/common"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@cs-magic/common"
import { Badge } from "../../../../../../packages/common/src/ui-shadcn/components/ui/badge"
import { FlexContainer } from "@cs-magic/common"
import { LabelLine } from "@cs-magic/common"
import { Textarea } from "@cs-magic/common"
import { StandardCard } from "../../../../../../packages/common/ui/components/standard-card"
import { serverFetch } from "./actions"
import { cookie2headers } from "./utils"

export type ValidateStatus =
  | "to-validate"
  | "validating"
  | "required"
  | "optional"
export type ICookie = { key: string; value: string; status: ValidateStatus }

const spiderUrlAtom = atomWithStorage(
  "spider.url",
  "https://api.bilibili.com/x/web-interface/wbi/view/detail?bvid=BV1p34y1J7TT&need_view=1",
)
const spiderCookieAtom = atomWithStorage(
  "spider.cookie",
  "buvid3=00D4CA84-7BCF-C416-F73F-9171645CDD5388105infoc; b_nut=1708041188; CURRENT_FNVAL=4048; _uuid=111053E63-3CC5-4C7A-E6D7-710F799FC141E88970infoc; buvid4=55B01DB3-467B-BA36-3F85-1CA5331ECE9C89276-024021523-cLS4Gi5%2FSc4BIV64uWW7jw%3D%3D; buvid_fp=566e25b9ab3128c977847f947b571673; enable_web_push=DISABLE; header_theme_version=CLOSE; home_feed_column=5; browser_resolution=1792-1008; DedeUserID=6669360; DedeUserID__ckMd5=e6208fc2747054f0; rpdid=|(u|JR)R~muu0J'u~|)|Ruk)~; share_source_origin=WEIXIN; SESSDATA=e4af78fd%2C1726891541%2C3bae6%2A32CjD_F64Z3XX4qdJKQGL2z8q63OzAqcVkS15xyt_roEp3gF1_3jVXkGxGrjYyBiOTZlISVjlodklKckE5TlIzYmZZNHJsSWY1clZsLUxKcWJCMVJCV3RuWnhndWV2RVRfNVlJamZka1V0SmdZYTc4M1phd3VlYWJka0NncnFXZGRDVlhySVN4cjdnIIEC; bili_jct=7e3004067912151df4a1c56a4e6d0b18; sid=7kdy21hu; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTE2Mjc2ODgsImlhdCI6MTcxMTM2ODQyOCwicGx0IjotMX0.4_7gvCagYrwKPsVPzqNM5JVp-fwLYB22PlfVVye5r0Q; bili_ticket_expires=1711627628; bsource=search_google; bp_video_offset_6669360=912812938490806280; b_lsid=FA39BAC5_18E78176610",
)
const spiderMethodAtom = atomWithStorage<ApiMethod>("spider.method", "GET")

export default function SpiderPage() {
  const [url, setUrl] = useAtom(spiderUrlAtom)
  const [inputCookie, setInputCookie] = useAtom(spiderCookieAtom)
  const [cookies, setCookies] = useState<ICookie[]>([])
  const [method, setMethod] = useAtom(spiderMethodAtom)
  console.log({ url, method })

  useEffect(() => {
    const parsedCookie: ICookie[] = []
    /**
     * chrome: {line: ;, kv: =}
     * charles: {line: \n, kv: \t}
     */
    inputCookie.split(/[\n;]/g).forEach((line) => {
      const [key, value = ""] = line.split(/[=\t]/, 2)
      // console.log({ line, key, value })
      if (key) parsedCookie.push({ key, value, status: "to-validate" })
    })
    setCookies(parsedCookie)
  }, [inputCookie])

  const testOK = async () => {
    const data = await serverFetch(url, cookie2headers(cookies), method)
    console.log("response: ", JSON.stringify(data, null, 2))
  }

  const validateCookie = async (cookies: ICookie[]) => {
    for (const cookie of cookies) {
      setCookies((cookies) =>
        produce(cookies, (cookies) => {
          cookies.find((c) => c.key === cookie.key)!.status = "validating"
        }),
      )
      const cookiesToSend = cookies.filter((c) => c.key !== cookie.key)
      const data = await serverFetch(url, cookie2headers(cookiesToSend), method)
      console.log({ cookie, data })

      setCookies((cookies) =>
        produce(cookies, (cookies) => {
          cookies.find((c) => c.key === cookie.key)!.status =
            data.code === 0 ? "optional" : "required"
        }),
      )

      await sleep(100)
    }
  }

  const requiredCookie = cookie2headers(
    cookies.filter((c) => c.status === "required"),
  )
  const [copiedState, copy] = useCopyToClipboard()

  useEffect(() => {
    console.log("copied state: ", copiedState)
  }, [copiedState])

  return (
    <FlexContainer
      orientation={"vertical"}
      className={"h-full justify-start overflow-auto"}
    >
      <Label className={"text-2xl"}>自动Cookie分析</Label>

      <StandardCard title={"Input"}>
        <LabelLine title={"url"}>
          <Input
            value={url}
            onChange={(event) => {
              setUrl(event.currentTarget.value)
            }}
          />
        </LabelLine>

        <LabelLine title={"cookie"}>
          <Textarea
            minRows={2}
            maxRows={4}
            value={inputCookie}
            onChange={(event) => {
              setInputCookie(event.currentTarget.value)
            }}
          />
        </LabelLine>

        <LabelLine title={"method"}>
          <Select
            value={method}
            onValueChange={(v) => setMethod(v as ApiMethod)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value={"GET"}>GET</SelectItem>
                <SelectItem value={"POST"}>POST</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </LabelLine>
      </StandardCard>

      <div className={"flex items-center gap-2"}>
        <Button
          onClick={async () => {
            await testOK()
          }}
        >
          Test OK
        </Button>

        <Button
          onClick={async () => {
            await validateCookie(cookies)
          }}
        >
          Validate Cookie
        </Button>

        <Button
          onClick={async () => {
            copy(requiredCookie)
          }}
        >
          Copy Required Cookie
        </Button>
      </div>

      <StandardCard title={"Parsed Cookies"}>
        {cookies.map(({ key, value, status }) => (
          <LabelLine title={key} key={key}>
            <div className={"flex w-full items-center"}>
              <span className={"grow truncate"}>{value}</span>
              <Badge
                className={"shrink-0"}
                variant={
                  status === "required"
                    ? "destructive"
                    : status === "optional"
                      ? "outline"
                      : "default"
                }
              >
                {status}
              </Badge>
            </div>
          </LabelLine>
        ))}
      </StandardCard>
    </FlexContainer>
  )
}
