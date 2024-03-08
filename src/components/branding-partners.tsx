import { INDIES_AVATARS, SPONSORS_BANNERS } from "@/config/branding"
import { SeparatorContainer } from "../../packages/common-ui/components/separator-container"
import { ImageEqualHeight } from "../../packages/common-ui/components/image-equal-height"
import {
  Avatar,
  AvatarImage,
} from "../../packages/common-ui/shadcn/shadcn-components/avatar"

export const BrandingPartners = () => {
  return (
    <>
      {!!SPONSORS_BANNERS.length && (
        <>
          <SeparatorContainer>合作伙伴</SeparatorContainer>
          <div className={"flex justify-center gap-4 mt-auto h-8"}>
            {SPONSORS_BANNERS.map((item) => (
              <ImageEqualHeight src={item} key={item} />
            ))}
          </div>
        </>
      )}

      {/*  individual */}
      {!!INDIES_AVATARS.length && (
        <>
          <SeparatorContainer>独立开发者</SeparatorContainer>
          <div className={"flex justify-center gap-4 mt-auto"}>
            {INDIES_AVATARS.map((item) => (
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
