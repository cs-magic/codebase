import axios from "axios"

export const api = axios.create({
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})
