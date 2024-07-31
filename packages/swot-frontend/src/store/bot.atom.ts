import { IUser } from "@cs-magic/swot-backend/schema"
import { atom } from "jotai"
import { Contact } from "wechaty-puppet/payloads"
import { ScanStatus } from "wechaty-puppet/types"

export const botSocketOpenedAtom = atom(false)
export const botScanValueAtom = atom("")
export const botUserAtom = atom<IUser | null>(null)
export const botContactsAtom = atom<Contact[] | null>(null)
export const botLoggedInAtom = atom(false)
export const botLoggingAtom = atom(false)
export const botScanStatusAtom = atom<ScanStatus>(ScanStatus.Unknown)
export const botScanningAtom = atom(false)
