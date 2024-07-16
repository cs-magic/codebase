import { atom } from "jotai"

import type { TransportType } from "@cs-magic/common"

///////////////////////////////
// base
//////////////////////////////

export const transportTypeAtom = atom<TransportType>("pusher")
