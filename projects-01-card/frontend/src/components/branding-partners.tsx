import {
  Avatar,
  AvatarImage,
} from "@cs-magic/common/deps/ui-shadcn/components/avatar"
import { ImageEqualHeight } from "@cs-magic/common/deps/ui/components/image-equal-height"
import { SeparatorContainer } from "@cs-magic/common/deps/ui/components/separator-container"

import { config } from "../../../../packages-common/common/config"

export const BrandingPartners = () => {
  const avatars = [config.website.avatar.mark, config.website.avatar.idoubi]
  const sponsors: string[] = []

  return (
    <>
      {!!sponsors.length && (
        <>
          <SeparatorContainer>合作伙伴</SeparatorContainer>
          <div className={"mt-auto flex h-8 justify-center gap-4"}>
            {sponsors.map((item) => (
              <ImageEqualHeight src={item} key={item} />
            ))}
          </div>
        </>
      )}

      {/*  individual */}
      {!!avatars.length && (
        <>
          <SeparatorContainer>独立开发者</SeparatorContainer>
          <div className={"mt-auto flex justify-center gap-4"}>
            {avatars.map((item) => (
              <Avatar key={item}>
                <AvatarImage src={item} />
              </Avatar>
            ))}
          </div>
        </>
      )}
    </>
  )
}
