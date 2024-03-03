import { atom } from "jotai"

import { IConvDetail, IConvSummary } from "@/schema/conv"

export const convsAtom = atom<IConvSummary[]>([])
export const convDetailAtom = atom<IConvDetail | null>(null)
export const convIdAtom = atom((get) => get(convDetailAtom)?.id)

// requests 是倒序的，所以最新的是在第一个
export const latestRequestAtom = atom((get) => get(convDetailAtom)?.requests[0])
