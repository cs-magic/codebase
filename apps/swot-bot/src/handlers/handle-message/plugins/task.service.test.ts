import { types } from "wechaty-puppet"

import { genRandomId } from "@cs-magic/common"

import { TaskService } from "./task.service.js"

describe("", () => {
  const talkerId = genRandomId()

  const taskService = new TaskService({
    type: types.Message.Text,
    roomId: undefined,
    id: genRandomId(),
    talkerId,
    timestamp: Date.now(),
    listenerId: genRandomId(),
  })

  it("test task format with grouped priorities", async () => {
    await taskService.add("test 1")
    await taskService.add("test 2")
    await taskService.add("test 3")
    await taskService.update(1, "this.priority=2")
    const s = await taskService.format()
    console.log(s)
  })

  it("test task CRUD", async () => {
    {
      await taskService.format()
      const data = await taskService.list()
      expect(data.length).toBe(0)
    }

    {
      await taskService.format()
      const data = await taskService.list()
      expect(data.length).toBe(1)
    }

    {
      const data = await taskService.update(0, 'this.status="done"')
      expect(data?.status).toBe("done")
      await taskService.format()
    }
  })
})
