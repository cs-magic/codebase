import { config } from "@cs-magic/common"
import { ImageEqualHeight } from "@cs-magic/react-ui"
import { SeparatorContainer } from "@cs-magic/react-ui"
import { Avatar, AvatarImage } from "@cs-magic/react-ui"

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
