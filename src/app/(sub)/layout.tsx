import { Header } from "@/components/header"
import { PropsWithChildren } from "react"

export default function SubLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header withBrand />

      <div className={"grow flex flex-col overflow-hidden"}>{children}</div>

      {/*<BrandingFooter />*/}
    </>
  )
}
