import * as console from "console"
import { scheduleJob } from "node-schedule"
import moment from "../../../../packages/datetime/moment"

const format = (d: Date | number | string) => {
  console.log(d)
  console.log(moment(d).format("MM-DD HH:mm"))
}

format(new Date())

const job = scheduleJob("0 * * * * *", () => {
  console.log("hello")
})

// ref: https://github.com/node-schedule/node-schedule/issues/436
format(new Date(job.nextInvocation()))
