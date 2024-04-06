import { GenCardViaBackend } from "@/components/gen-card_backend"
import React from "react"
import { genPageTitle } from "../../../../../utils"

export const metadata = {
  title: genPageTitle("渲染卡片（后端）"),
}

export default async function GenCardViaBackendPage() {
  return <GenCardViaBackend />
}
