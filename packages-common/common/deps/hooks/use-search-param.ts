import { useSearchParams } from "next/navigation"

export const useSearchParam = <T extends string>(field: string) => {
  return useSearchParams().get(field) as T | null
}
