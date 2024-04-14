// import { Message } from "@prisma/client"
// import { create } from "zustand"
// import { devtools } from "zustand/middleware"
// import { immer } from "zustand/middleware/immer"
//
// export interface ConversationDetailSlice {
//   conversationId: string | null
//   setConversationId: (conversationId: string) => void
//
//   messages: Message[]
//   addMessage: (message: Message) => void
// }
//
// export const useConversationDetailStore = create<ConversationDetailSlice>()(
//   devtools(
//     immer((setState, getState, store) => ({
//       conversationId: null,
//       setConversationId: (conversationId) =>
//         setState((state) => {
//           state.conversationId = conversationId
//         }),
//
//       messages: [],
//       addMessage: (message) =>
//         setState((state) => {
//           state.messages.push(message)
//         }),
//     })),
//   ),
// )
