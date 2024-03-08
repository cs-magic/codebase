import Link from "next/link"
import { Button } from "../../../../packages/common-ui/shadcn/shadcn-components/button"

export default function TextToImagePage() {
  return (
    <div
      className={
        "w-full h-full flex flex-col items-center justify-center gap-8"
      }
    >
      <h2>敬请期待！</h2>
      <Link href="/">
        <Button>返回 AI 的大家族</Button>
      </Link>
    </div>
  )
}
