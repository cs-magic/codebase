import { atom } from "jotai"

import { IConvClient } from "@/schema/conv"

export const convsAtom = atom<IConvClient[]>([])
export const convIdAtom = atom("")
export const convAtom = atom((get) =>
  get(convsAtom).find((c) => c.id === get(convIdAtom)),
)

export const latestRequestAtom = atom((get) => {
  const conv = get(convAtom)
  // queries 是倒序拿的
  if (conv && "requests" in conv) return conv.requests[0]
})
