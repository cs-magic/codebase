"use client"

import ansiColors from "ansi-colors"
import { useSearchParams } from "next/navigation"
import Conv from "../../../../components/conv"

/**
 * 1. 判断是否要拉取 conv
 * 1.1 拉取了 conv，判断 req 之类的数据正不正确
 *
 * @param slug
 * @constructor
 */
export default function ConvPage({
  params: { slug },
}: {
  params: {
    slug?: string[]
  }
}) {
  const convIdInUrl = slug ? slug[0] : slug
  const reqIdInUrl = useSearchParams().get("r")

  console.log(ansiColors.red("== ConvPage =="), { convIdInUrl, reqIdInUrl })

  return <Conv convIdInUrl={convIdInUrl} reqIdInUrl={reqIdInUrl} />
}
