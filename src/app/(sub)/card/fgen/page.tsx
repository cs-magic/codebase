import { GenCardViaFrontend } from "../../../../components/gen-card-via-frontend"
import { genPageTitle } from "../../../../utils"

export const metadata = {
  title: genPageTitle("渲染卡片"),
}

export default async function GenCardViaFrontendPage() {
  return <GenCardViaFrontend />
}
