// import { nanoid } from "nanoid"
// import { api } from "@/api/react"
// import { toast } from "sonner"
// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { create } from "zustand"
// import { devtools } from "zustand/middleware"
// import { immer } from "zustand/middleware/immer"
// import { IConversationBasic } from "@/schema/conversation"
// import { useConversationDetailStore } from "./zustand-slice"
// import { useSnapshot } from "valtio"
// import { pAppsState } from "@/hooks/use-conversation"
//
// export interface ConversationListSlice {
//   data: IConversationBasic[]
// }
//
// export const useConversationListStore = create<ConversationListSlice>()(
//   devtools(
//     immer((setState, getState, store) => ({
//       data: [],
//     })),
//   ),
// )
// export const useAddConversationWithoutQuery = () => {
//   const router = useRouter()
//
//   return async () => {
//     const apps = useSnapshot(pAppsState)
//     console.log({ apps })
//
//     const { mutateAsync } = api.llm.createConversation.useMutation()
//     const newConversation = await mutateAsync({
//       pAppIds: apps,
//       type: "LLM",
//     })
//     console.log({ newConversation })
//
//     useConversationListStore.setState((state) => {
//       // first
//       state.data.splice(0, 0, newConversation)
//     })
//     router.push(`/tt/${newConversation.appId}`)
//   }
// }
// export const useAddConversationWithQuery = () => {
//   const addConversationWithoutQuery = useAddConversationWithoutQuery()
//   // todo: prompt
//   return (prompt: string) => {
//     void addConversationWithoutQuery()
//     useConversationDetailStore.setState((state) => {
//       state.messages.push({
//         appId: nanoid(),
//         content: prompt,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         role: "user",
//         // todo
//         conversationModelId: "",
//       })
//     })
//   }
// }
// /**
//  * 不要用乐观更新，否则会乱
//  */
// export const useDeleteConversation = () => {
//   const deleteConversation = api.llm.delConversation.useMutation({})
//
//   return async (conversationId: string) => {
//     void deleteConversation
//       .mutateAsync(conversationId)
//       .catch((error) => {
//         console.error(error)
//         toast.error("删除失败！")
//       })
//       .then(() => {
//         toast.success("删除成功")
//         useConversationListStore.setState((state) => {
//           state.data = state.data.filter((d) => d.appId !== conversationId)
//         })
//       })
//   }
// }
// /**
//  * 直接导出 hook，不要用 `use server`，写法反而麻烦
//  * 而且 nextjs 限制在组件没有 mount 之前就更新数据状态
//  */
// export const useInitConversationList = () => {
//   const { data: conversations = [] } = api.llm.listConversations.useConvQuery()
//
//   useEffect(() => {
//     console.log("inited conversations: ", conversations)
//     useConversationListStore.setState((state) => {
//       state.data = conversations
//     })
//   }, [conversations])
// }
