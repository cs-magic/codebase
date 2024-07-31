// import { Card } from "../../../../components/card"
import { genPageTitle } from "@cs-magic/swot-frontend/utils/get-page-title"
import dynamic from "next/dynamic"

// ref: https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
const CardNoSSR = dynamic(() => import("../../../../components/card"), {
  ssr: false,
})

export const metadata = {
  title: genPageTitle("渲染卡片"),
}

export default async function GenCardViaFrontendPage() {
  return <CardNoSSR />
  // return "hello"
}
