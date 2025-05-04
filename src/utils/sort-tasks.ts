// Função genérica para ordenar o array de tasks

import { TaskModel } from '../models/task-model'

export type SortTasksOptions = {
  tasks: TaskModel[]
  direction?: 'asc' | 'desc'
  field?: keyof TaskModel
}

export function sortTasks({
  tasks = [],
  direction = 'desc',
  field = 'startDate',
}: SortTasksOptions) {
  return tasks.sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]

    if (aValue === null && aValue === bValue) return 0
    if (aValue === null) return 1
    if (bValue === null) return -1
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    return 0
  })
}
