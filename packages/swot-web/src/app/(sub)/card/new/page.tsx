import { NewCard } from "../../../../components/new-card"
import { genPageTitle } from "../../../../utils/get-page-title"

export const metadata = {
  title: genPageTitle("新建卡片"),
}

export default async function NewCardPage() {
  return <NewCard />
}
