import { NewCard } from "@/components/new-card"
import { genPageTitle } from "../../../../utils"

export const metadata = {
  title: genPageTitle("新建卡片"),
}

export default function NewCardPage() {
  return <NewCard />
}
