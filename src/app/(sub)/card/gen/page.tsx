import { Card } from "@/components/card"
import { genPageTitle } from "../../../../utils"

export const metadata = {
  title: genPageTitle("渲染卡片"),
}

export default function CardPage() {
  return <Card />
}
