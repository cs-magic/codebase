import { atom } from "jotai"

export const userPhoneAtom = atom("")
export const userNameAtom = atom<string | undefined>(undefined)
export const userImageAtom = atom<string | undefined>(undefined)

export const tokenExpireSeconds = 60 * 60 * 24 * 3 // 3days
