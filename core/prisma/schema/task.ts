export type TaskTimer = {
  startDate: Date
  disabled?: boolean
} & (
  | {
      period: number // ms, 0=one-time, k=period
    }
  | {
      weekdays: number[] // [0-6]
    }
)
