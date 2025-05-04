import { TaskStateModel } from '../models/task-state-model'

let instance: TimerWorkerManager | null = null

export class TimerWorkerManager {
  private worker: Worker

  private constructor() {
    this.worker = new Worker(new URL('./timer-worker.js', import.meta.url))
  }

  static getInstance() {
    if (!instance) {
      instance = new TimerWorkerManager()
    }

    return instance
  }

  postMessage(message: TaskStateModel) {
    this.worker.postMessage(message)
    return this
  }

  onMessage(cb: (e: MessageEvent) => void) {
    this.worker.onmessage = cb
    return this
  }

  terminate() {
    this.worker?.terminate()
    instance = null
    return this
  }
}
