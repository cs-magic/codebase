"use client"

import { useAtom } from "jotai"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { userImageAtom, userNameAtom } from "../common-auth/store"

/**
 * 充分性：实时显示用户正在更新的昵称与头像
 * 必要性：使用hook维护多种状态
 * @param key
 */
export const useDraftSession = (key: "name" | "image") => {
  const atom = key === "name" ? userImageAtom : userNameAtom
  const [draft, setDraft] = useAtom(atom)
  const sessionValue = useSession().data?.user[key]

  const changed = draft !== sessionValue

  // console.log({ key, value, draft, changed })

  useEffect(() => {
    setDraft(sessionValue)
  }, [sessionValue])

  return {
    value: sessionValue,
    draft,
    changed,
    setDraft,
  }
}
