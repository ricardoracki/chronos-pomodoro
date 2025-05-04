import { TaskActionModel, TaskActionTypes } from './task-actions'

import { TaskStateModel } from '../../models/task-state-model'
import { formarSecondsToMinutes } from '../../utils/format-seconds-to-minutes'
import { getNextCycle } from '../../utils/get-next-cycle'
import { initialTaskState } from './initial-task-state'

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload
      const nextCycle = getNextCycle(state.currentCycle)
      const secondsRemaining = newTask.duration * 60

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formarSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      }
    }

    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map((task) =>
          task.id === state.activeTask?.id
            ? { ...task, interruptDate: Date.now() }
            : task
        ),
      }
    }

    case TaskActionTypes.RESET_STATE: {
      return { ...initialTaskState, config: state.config }
    }

    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formarSecondsToMinutes(
          action.payload.secondsRemaining
        ),
      }
    }

    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map((task) =>
          state.activeTask && task.id === state.activeTask.id
            ? { ...task, completeDate: Date.now() }
            : task
        ),
      }
    }

    case TaskActionTypes.SET_SETTINGS: {
      return {
        ...state,
        config: action.payload.config,
      }
    }

    default:
      return state
  }
}
