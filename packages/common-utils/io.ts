/**
 *
 * 可用于从网页（例如小红书）里提取 ssr json data
 *
 * ref:
 * - https://stackoverflow.com/a/48143679/9422455
 * - https://www.npmjs.com/package/serialize-javascript#deserializing
 * @param serializedJavascript
 */
export function deserialize(serializedJavascript: string) {
  return eval("(" + serializedJavascript + ")")
}
