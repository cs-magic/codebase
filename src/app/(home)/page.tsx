import { Container } from "@/components/containers"
import { getServerSession } from "next-auth"
import { ConfigApp } from "@/components/config-app"
import { BrandTitle } from "@/components/branding"
import { QueryInHomePage } from "@/components/query-in-home-page"

export default async function HomePage() {
  const session = await getServerSession()
  console.log("[HomePage]: ", { session })

  return (
    <Container
      id={"main-container"}
      orientation={"vertical"}
      className={"max-w-2xl grow sm:w-3/5 mx-auto flex flex-col justify-start"}
    >
      <div className={"h-1/3 flex flex-col justify-end mb-8"}>
        <BrandTitle />
      </div>

      {/*<TV />*/}

      <ConfigApp />

      <QueryInHomePage />
    </Container>
  )
}
