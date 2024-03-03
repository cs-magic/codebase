import Link from "next/link"
import { Button } from "@/common/components/ui/button"
import React from "react"

export const ReturnHomeAlertDialog = ({ content }: { content: string }) => (
  <div
    className={"w-full h-full flex flex-col items-center justify-center gap-8"}
  >
    <h2>{content}</h2>
    <Link href="/">
      <Button>返回 AI 的大家族</Button>
    </Link>
  </div>
)
