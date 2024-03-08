import { atom } from "jotai"

export const smsPhoneAtom = atom("")
export const smsNameAtom = atom<string | null | undefined>(null)
export const smsImageAtom = atom<string | null | undefined>(null)
