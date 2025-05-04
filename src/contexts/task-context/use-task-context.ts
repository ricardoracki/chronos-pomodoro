import { TaskContext } from './tasks-context'
import { useContext } from 'react'

export const useTaskContext = () => useContext(TaskContext)
