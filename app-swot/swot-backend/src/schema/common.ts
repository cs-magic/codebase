export type QueueTask = () => Promise<any>

export enum Priority {
  highest = 1,
  high = 3,
  normal = 5,
  low = 7,
  lowest = 9,
}
