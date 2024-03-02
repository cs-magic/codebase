import { Header } from "@/components/layout/header"
import { PropsWithChildren } from "react"

export default function SubLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header withBrand />

      <div
        className={
          "grow flex flex-col overflow-auto justify-center items-center "
        }
      >
        {children}
      </div>

      {/*<BrandingFooter />*/}
    </>
  )
}
