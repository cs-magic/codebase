import { atom } from "jotai"

export const userPhoneAtom = atom("")
export const userNameAtom = atom<string | null | undefined>(null)
export const userImageAtom = atom<string | null | undefined>(null)

export const tokenExpireSeconds = 60 * 60 * 24 * 3 // 3days
