import { useSearchParams } from "next/navigation"
import Conv from "../../../../components/conv"

export default function ConvPage({
  params: { slug },
}: {
  params: {
    slug?: string[]
  }
}) {
  const convIdInUrl = slug ? slug[0] : slug
  const reqIdInUrl = useSearchParams().get("r")

  return <Conv convIdInUrl={convIdInUrl} reqIdInUrl={reqIdInUrl} />
}
