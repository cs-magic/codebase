import { Header } from "@/components/header"
import React, { PropsWithChildren } from "react"
import { BrandingFooter } from "@/components/footer"

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <div className={"grow"}>{children}</div>

      <BrandingFooter />
    </>
  )
}
