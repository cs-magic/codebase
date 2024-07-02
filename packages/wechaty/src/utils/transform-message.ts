import { Message, types } from "wechaty"

/**
 * 【标准化信息流 @bryan-infra-01】
 * - 将任意类型的 message 转化为适合飞脑解析、读取的格式
 *
 * @param message
 */
export const transformMessage = async (message: Message) => {
  const type = message.type()

  switch (type) {
    case types.Message.Image:
    case types.Message.Url:
    case types.Message.Video:
    case types.Message.Audio:
    case types.Message.Contact:
    case types.Message.Post:
    case types.Message.Emoticon:
    case types.Message.GroupNote:
    case types.Message.Location:
    case types.Message.Recalled:
    case types.Message.Unknown:
    case types.Message.ChatHistory:
    case types.Message.Transfer:
    case types.Message.MiniProgram:
    case types.Message.RedEnvelope:
    case types.Message.Attachment:
    case types.Message.Text:
    default:
      break
  }
}
