import { UserButton } from "@/components/header-user"
import { Apps } from "@/components/header-apps"
import { BrandingTitle } from "@/components/branding-title"

export const Header = ({ withBrand }: { withBrand?: boolean }) => {
  return (
    <div className={"shrink-0 w-full flex gap-2 px-6 py-4"}>
      {withBrand && <BrandingTitle className={"text-2xl"} withDescription />}

      <div className={"grow"} />

      <div className={"ml-auto shrink-0 flex items-center gap-2"}>
        <Apps />

        <UserButton />
      </div>
    </div>
  )
}
