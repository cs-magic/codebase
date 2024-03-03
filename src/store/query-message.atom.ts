import { atom } from "jotai"
import { IMessageInChat } from "@/schema/query-message"

export const messageTraceAtom = atom<IMessageInChat[]>([])
