import { CsMagicBrand, V2AGIBrand } from "@/config/assets"
import { ImageEqualHeight } from "../../packages/common-ui/components/image-equal-height"
import { SHOW_PARTNERS } from "@/config/branding"
import { BrandingPartners } from "@/components/branding-partners"
import Link from "next/link"

export const Footer = () => {
  const enterprises: string[] = []

  return (
    <div className={"shrink-0 flex flex-col items-center gap-2 mt-auto p-4"}>
      {/*  founders */}
      <div
        className={
          "w-full flex justify-center items-center gap-4 mt-auto h-4 sm:h-8"
        }
      >
        <Link
          href={"https://cs-magic.cn"}
          className={"h-full"}
          target={"_blank"}
        >
          <CsMagicBrand className={"h-full w-auto"} />
        </Link>

        <Link
          href={"https://waytoagi.com"}
          className={"h-full"}
          target={"_blank"}
        >
          <V2AGIBrand className={"h-full w-auto text-primary"} />
        </Link>

        {enterprises.map((item) => (
          <ImageEqualHeight src={item} key={item} />
        ))}
      </div>

      {SHOW_PARTNERS && <BrandingPartners />}
    </div>
  )
}
