import { useAtom } from "jotai"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { smsImageAtom, smsNameAtom } from "../lib/sms/store"

export const useDraftSession = (key: "name" | "image") => {
  const atom = key === "name" ? smsImageAtom : smsNameAtom
  const [draft, setDraft] = useAtom(atom)
  const value = useSession().data?.user[key] ?? ""

  const changed = draft !== value

  // console.log({ key, value, draft, changed })

  useEffect(() => {
    setDraft(value)
  }, [value])

  return {
    value,
    draft,
    changed,
    setDraft,
  }
}
