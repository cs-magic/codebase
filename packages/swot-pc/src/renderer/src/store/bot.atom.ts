import { IUser, ScanStatus } from '@cs-magic/swot-bot/schema'
import { atom } from 'jotai'
import { ContactPayload } from '../connection/concat.schema'

export const botSocketOpenedAtom = atom(false)
export const botScanValueAtom = atom('')
export const botUserAtom = atom<IUser | null>(null)
export const botContactsAtom = atom<ContactPayload[] | null>(null)
export const botLoggedInAtom = atom(false)
export const botLoggingAtom = atom(false)
export const botScanStatusAtom = atom<ScanStatus>(ScanStatus.Unknown)
export const botScanningAtom = atom(false)
