import { TaskActionModel } from './task-actions'
import { TaskStateModel } from '../../models/task-state-model'
import { createContext } from 'react'

export type TaskContextProps = {
  data: TaskStateModel
  dispatch: React.Dispatch<TaskActionModel>
}

export const TaskContext = createContext<TaskContextProps>(
  {} as TaskContextProps
)
