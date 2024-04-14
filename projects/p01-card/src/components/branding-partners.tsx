import {
  Avatar,
  AvatarImage,
} from "../../../common-ui-shadcn/components/avatar"
import { ImageEqualHeight } from "../../../common-ui/components/image-equal-height"
import { SeparatorContainer } from "../../../common-ui/components/separator-container"

import { config } from "../config"

export const BrandingPartners = () => {
  const avatars = [config.website.avatar.mark, config.website.avatar.idoubi]
  const sponsors: string[] = []

  return (
    <>
      {!!sponsors.length && (
        <>
          <SeparatorContainer>合作伙伴</SeparatorContainer>
          <div className={"flex justify-center gap-4 mt-auto h-8"}>
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
          <div className={"flex justify-center gap-4 mt-auto"}>
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
