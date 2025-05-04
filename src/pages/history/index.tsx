import { useEffect, useMemo, useState } from 'react'

import { Button } from '../../components/button'
import { Container } from '../../components/container'
import { Heading } from '../../components/heading'
import { MainTemplate } from '../../templates/main-template'
import { TaskActionTypes } from '../../contexts/task-context/task-actions'
import { TaskModel } from '../../models/task-model'
import { TrashIcon } from 'lucide-react'
import { formatDate } from '../../utils/format-date'
import { getTaskStatus } from '../../utils/get-task-status'
import { showMessage } from '../../adapters/show-message'
import { sortTasks } from '../../utils/sort-tasks'
import styles from './styles.module.css'
import { useTaskContext } from '../../contexts/task-context/use-task-context'

export function History() {
  const { data, dispatch } = useTaskContext()

  const [options, setOptions] = useState<{
    field: undefined | keyof TaskModel
    direction: undefined | 'asc' | 'desc'
  }>({
    field: undefined,
    direction: undefined,
  })

  const history = useMemo(
    () =>
      sortTasks({
        tasks: data.tasks,
        ...options,
      }),
    [data, options]
  )

  const taskTypeDictionary = {
    workTime: 'Foco',
    shortBreakTime: 'Descanso curto',
    longBreakTime: 'Descanso longo',
  }

  function handleDeleteHistory() {
    showMessage.confirm({
      message: 'Deseja limpar o histórico?',
      onConfirm: () => dispatch({ type: TaskActionTypes.RESET_STATE }),
    })
  }

  function handleSort(field: keyof TaskModel) {
    let direction: 'asc' | 'desc' = 'desc'

    if (options.field === field) {
      direction = options.direction === 'asc' ? 'desc' : 'asc'
    }

    setOptions({ field, direction })
  }

  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro'
    return () => {
      showMessage.dismiss()
    }
  }, [])

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          <span>
            {history.length > 0 && (
              <Button
                color="red"
                size="icon"
                icon={<TrashIcon />}
                title="Limpar histórico"
                aria-label="Limpar histórico"
                onClick={handleDeleteHistory}
              />
            )}
          </span>
        </Heading>
      </Container>
      <Container>
        {history.length > 0 ? (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')}>Tarefa ↕</th>
                  <th onClick={() => handleSort('duration')}>Duração ↕</th>
                  <th onClick={() => handleSort('startDate')}>Data ↕</th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {history.map((task) => (
                  <tr key={`${task.id}`}>
                    <td>{task.name}</td>
                    <td>{task.duration}</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, data.activeTask)}</td>
                    <td>{taskTypeDictionary[task.type]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.emptyMessage}>
            Ainda não existem tarefas criadas
          </p>
        )}
      </Container>
    </MainTemplate>
  )
}
