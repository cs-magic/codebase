import { formatError } from "./format-error"

/**
 * todo: how to accept a func no matter it's sync or async ?
 * @param func
 * @param name
 */
export const formatAction = async (func: () => any, name = "doing action") => {
  try {
    console.log(`🌈 ${name}`)
    const result = func() // This will immediately return for sync functions, and return a Promise for async functions
    if (result instanceof Promise) await result // Only waits if func is async
    console.log(`✅ ${name}`)
  } catch (e) {
    console.log(`❌ ${name}`)
    formatError(e)
  } finally {
    // console.log(`-- finished ${name}`)
  }
}
