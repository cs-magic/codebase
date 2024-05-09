import { BrandingPartners } from "./branding-partners"
import Link from "next/link"
import { ImageEqualHeight } from "../../../../packages-to-classify/ui/components/image-equal-height"

import { config } from "../../../../packages-common/common/config"
import { CsMagicBrand } from "./assets"

export const Footer = () => {
  const enterprises: string[] = []

  return (
    <div className={"mt-auto flex shrink-0 flex-col items-center gap-2 p-4"}>
      {/*  founders */}
      <div
        className={
          "mt-auto flex h-4 w-full items-center justify-center gap-4 sm:h-8"
        }
      >
        <Link
          href={"https://cs-magic.cn"}
          className={"h-full"}
          target={"_blank"}
        >
          <CsMagicBrand className={"h-full w-auto"} />
        </Link>

        {/*<Link*/}
        {/*  href={"https://waytoagi.com"}*/}
        {/*  className={"h-full"}*/}
        {/*  target={"_blank"}*/}
        {/*>*/}
        {/*  <V2AGIBrand className={"h-full w-auto text-primary"} />*/}
        {/*</Link>*/}

        {enterprises.map((item) => (
          <ImageEqualHeight src={item} key={item} />
        ))}
      </div>

      {config.website.partners.show && <BrandingPartners />}
    </div>
  )
}
