import { Header } from "@/components/layout/header"
import { PropsWithChildren } from "react"
import { BrandingFooter } from "@/components/layout/footer"

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />

      <div className={"grow flex flex-col justify-center items-center "}>
        {children}
      </div>

      <BrandingFooter />
    </>
  )
}
