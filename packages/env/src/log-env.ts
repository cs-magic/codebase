import pickBy from "lodash/pickBy.js"

export const logEnv = (filter?: string) => {
  const data = pickBy(
    process.env,
    (v, k) => !filter || k.toLowerCase().includes(filter.toLowerCase()),
  )

  console.info(`-- environment variables (filter=${filter}): %o`, data)
}
