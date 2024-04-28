// import { genId } from "@cs-magic/common/utils/gen-id"
import { genRandomId } from "@cs-magic/common/utils/gen-random-id"
import { types } from "wechaty-puppet"
import { TaskService } from "./task.service"

it("should task2", async () => {
  const talkerId = genRandomId()

  const taskService = new TaskService({
    type: types.Message.Text,
    roomId: undefined,
    id: genRandomId(),
    talkerId,
    timestamp: Date.now(),
    listenerId: genRandomId(),
  })

  {
    await taskService.format()
    const data = await taskService.list()
    expect(data.length).toBe(0)
  }

  {
    const data = await taskService.add("test 1")
    expect(data.ownerId).toBe(talkerId)
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
