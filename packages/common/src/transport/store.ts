import { atom } from "jotai"

import type { TransportType } from "./schema.js"

///////////////////////////////
// base
//////////////////////////////

export const transportTypeAtom = atom<TransportType>("pusher")
