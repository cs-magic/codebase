import { SwotLogoPng } from "@cs-magic/common/deps/ui/assets"
import { FlexContainer } from "@cs-magic/common/deps/ui/components/flex-container"
import Image from "next/image"

export default async function HomePage() {
  return (
    <FlexContainer>
      <Image
        src={SwotLogoPng}
        alt={""}
        width={240}
        height={240}
        className={"h-auto"}
      />
    </FlexContainer>
  )
}
