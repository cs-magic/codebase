import { genPageTitle } from "@/utils/get-page-title"
import { Suspense } from "react"
import { Card } from "../../../../components/card"

export const metadata = {
  title: genPageTitle("渲染卡片"),
}

export default async function GenCardViaFrontendPage() {
  return (
    <Suspense>
      <Card />
    </Suspense>
  )
}
