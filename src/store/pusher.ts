import { atom } from "jotai"
import Pusher from "pusher-js"

export const pusherAtom = atom<Pusher | null>(null)
