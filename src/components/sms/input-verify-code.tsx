import { useSmsStore } from "@/store/sms"
import { DigitContainer } from "@/components/containers"

export const InputVerifyCode = () => {
  const { code } = useSmsStore((state) => ({
    code: state.code,
  }))

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
