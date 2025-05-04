import { PropsWithChildren, useEffect, useReducer, useRef } from 'react'

import { TaskActionTypes } from './task-actions'
import { TaskContext } from './tasks-context'
import { TaskStateModel } from '../../models/task-state-model'
import { TimerWorkerManager } from '../../workers/timer-worker-manager'
import { initialTaskState } from './initial-task-state'
import { loadBeep } from '../../utils/load-beep'
import { taskReducer } from './task-reducer'

export const TaskContextProvider = ({ ...props }: PropsWithChildren) => {
  const [data, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const localData = localStorage.getItem('state')

    if (!localData) return initialTaskState
    const parsedState = JSON.parse(localData) as TaskStateModel

    return {
      ...parsedState,
      activeState: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    }
  })

  const worker = TimerWorkerManager.getInstance()
  const playBeepRef = useRef<null | ReturnType<typeof loadBeep>>(null)

  worker.onMessage((e) => {
    const countDownSeconds = e.data

    if (countDownSeconds <= 0) {
      playBeepRef.current?.()
      dispatch({ type: TaskActionTypes.COMPLETE_TASK })
      worker.terminate()
      playBeepRef.current = null
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      })
    }
  })

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(data))

    if (!data.activeTask) {
      worker.terminate()
    } else {
      worker.postMessage(data)
    }

    document.title = `${data.formattedSecondsRemaining} - Chromos pomodoro`
  }, [data, worker])

  useEffect(() => {
    if (data.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep()
    } else {
      playBeepRef.current = null
    }
  }, [data.activeTask])

  return <TaskContext.Provider value={{ data, dispatch }} {...props} />
}
