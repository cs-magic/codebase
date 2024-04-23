import { ICookie } from "./page"

export const cookie2headers = (cookies: ICookie[]) =>
  cookies.map((c) => `${c.key}=${c.value}`).join(";")
