"use client"
import { smsCodeAtom } from "../../packages/common/lib/sms/store"
import { useAtom } from "jotai"
import { DigitContainer } from "../../packages/common/components/digit-container"
import { cn } from "../../packages/common/lib/utils"
import { SMS_DIGIT_SIZE } from "@/config/system"

export const AuthSmsInputDigits = () => {
  const [code] = useAtom(smsCodeAtom)

  return (
    <div className={"flex justify-center items-center gap-2 "}>
      <span className={cn("font-black text-primary/75", SMS_DIGIT_SIZE)}>
        M -{" "}
      </span>

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
