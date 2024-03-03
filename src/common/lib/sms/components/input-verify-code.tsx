"use client"
import { smsCodeAtom } from "@/common/lib/sms/atom-state"
import { useAtom } from "jotai"
import { DigitContainer } from "@/common/components/digit-container"

export const InputVerifyCode = () => {
  const [code] = useAtom(smsCodeAtom)

  return (
    <div className={"flex justify-center gap-2"}>
      {[...Array(6)].map((value, index) => (
        <DigitContainer
          key={index}
          focus={index === code.length}
          value={index < code.length ? code[index] : ""}
          onKeyDown={(event) => {
            event.preventDefault()
          }}
          // suppress (un)control
          onChange={(event) => null}
        />
      ))}
    </div>
  )
}
