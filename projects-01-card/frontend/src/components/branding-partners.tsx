import {
  Avatar,
  AvatarImage,
} from "../../../../packages-to-classify/ui-shadcn/components/avatar"
import { ImageEqualHeight } from "../../../../packages-to-classify/ui/components/image-equal-height"
import { SeparatorContainer } from "../../../../packages-to-classify/ui/components/separator-container"

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
