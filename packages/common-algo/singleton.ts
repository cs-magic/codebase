export const staticCreate = <T = any>(f: () => T) => {
  const g = {
    data: undefined,
  } as unknown as {
    data: T | undefined
  }

  return (g.data ??= f())
}
