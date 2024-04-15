export function getRecordKeys<K extends string, T extends Record<K, any> = any>(
  record: T,
): K[] {
  return Object.keys(record) as K[]
}
