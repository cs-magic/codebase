import dotenv from "dotenv"
import { callZhipu } from "../models/zhipu"
dotenv.config()

const f = async () => {
  const result = await callZhipu({
    model: "glm-4",
    messages: [
      {
        content: "hello",
        role: "user",
      },
    ],
    stream: false,
  })

  console.log("-- result: ", result)
}

it("test glm-4", f, 10e3)
