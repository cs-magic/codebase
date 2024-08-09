import { NewCard } from "@cs-magic/swot-frontend/components/new-card"
import { genPageTitle } from "@cs-magic/swot-frontend/utils/get-page-title"

export const metadata = {
  title: genPageTitle("新建卡片"),
}

export default async function NewCardPage() {
  return <NewCard />
}
