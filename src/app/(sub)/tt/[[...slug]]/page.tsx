"use client"

import { useSearchParams } from "next/navigation"
import Conv from "../../../../components/conv"
import ansiColors from "ansi-colors"

export default function ConvPage({
  params: { slug },
}: {
  params: {
    slug?: string[]
  }
}) {
  const convIdInUrl = slug ? slug[0] : slug
  const reqIdInUrl = useSearchParams().get("r")

  console.log(ansiColors.red("-- ConvPage: "), { convIdInUrl, reqIdInUrl })

  return <Conv convIdInUrl={convIdInUrl} reqIdInUrl={reqIdInUrl} />
}
