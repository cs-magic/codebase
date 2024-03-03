import { atom } from "jotai"

import { IConvClient } from "@/schema/conv"

export const convsAtom = atom<IConvClient[]>([])
export const convIdAtom = atom("")
export const convAtom = atom((get) =>
  get(convsAtom).find((c) => c.id === get(convIdAtom)),
)

export const latestQueryAtom = atom((get) => {
  const conv = get(convAtom)
  // queries 是倒序拿的
  if (conv && "queries" in conv) return conv.queries[0]
})
