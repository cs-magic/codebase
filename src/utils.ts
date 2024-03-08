/**
 * triggerID 合并没问题，但是谨慎分隔，因为字符串可能由prisma控制的
 * @param requestID
 * @param appID
 */
export const TRIGGER_SEPARATOR = "__"
export const getTriggerID = (requestID: string, appID: string) =>
  [requestID, appID].join(TRIGGER_SEPARATOR)
