import { TaskModel } from '../../models/task-model'
import { TaskStateModel } from '../../models/task-state-model'

export enum TaskActionTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_STATE = 'RESET_STATE',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK',
  SET_SETTINGS = 'SET_SETTINGS',
}

export type TaskActionsWithPayload =
  | {
      type: TaskActionTypes.START_TASK
      payload: TaskModel
    }
  | {
      type: TaskActionTypes.COUNT_DOWN
      payload: Pick<TaskStateModel, 'secondsRemaining'>
    }
  | {
      type: TaskActionTypes.SET_SETTINGS
      payload: Pick<TaskStateModel, 'config'>
    }

export type TaskActionsWithoutPayload =
  | {
      type: TaskActionTypes.RESET_STATE
    }
  | {
      type: TaskActionTypes.INTERRUPT_TASK
    }
  | {
      type: TaskActionTypes.COMPLETE_TASK
    }

export type TaskActionModel = TaskActionsWithPayload | TaskActionsWithoutPayload
