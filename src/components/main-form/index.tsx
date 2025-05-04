import { PlayCircleIcon, StopCircleIcon } from 'lucide-react'

import { Button } from '../button'
import { Container } from '../container'
import { Cycles } from '../cycles'
import { Input } from '../input'
import { TaskActionTypes } from '../../contexts/task-context/task-actions'
import { TaskModel } from '../../models/task-model'
import { Tips } from '../tips'
import { getNextCycle } from '../../utils/get-next-cycle'
import { getNextCycleType } from '../../utils/get-next-cycle-type'
import { showMessage } from '../../adapters/show-message'
import { useRef } from 'react'
import { useTaskContext } from '../../contexts/task-context/use-task-context'

export function MainForm() {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const { data, dispatch } = useTaskContext()

  const hasActiveTask = !!data.activeTask
  const nextCycle = getNextCycle(data.currentCycle)
  const nextCycleType = getNextCycleType(nextCycle)

  const lastTaskName = data.tasks[data.tasks.length - 1]?.name || ''

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    showMessage.dismiss()

    if (!nameInputRef.current) return

    const taskName = nameInputRef.current.value.trim()
    if (!taskName) return showMessage.warning('Digite o nome da tarefa')

    const newTask: TaskModel = {
      id: Date.now().toString(),
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      name: taskName,
      duration: data.config[nextCycleType],
      type: nextCycleType,
    }

    dispatch({
      type: TaskActionTypes.START_TASK,
      payload: newTask,
    })
    showMessage.success('Tarefa iniciada com sucesso!')
  }

  function handleInterruptTask() {
    showMessage.error('Tarefa interrompida!')
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK })
  }

  return (
    <>
      <Container>
        <form className="form" onSubmit={handleSubmit}>
          <div className="formRow">
            <Input
              labelText="task"
              id={'MeuInput'}
              placeholder="Digite algo"
              ref={nameInputRef}
              disabled={hasActiveTask}
              defaultValue={lastTaskName}
            />
          </div>
          <div id="formRow">
            <Tips />
          </div>
          {data.currentCycle > 0 && (
            <div id="formRow">
              <Cycles />
            </div>
          )}
          <div id="formRow">
            {!hasActiveTask ? (
              <Button
                key={'submit'}
                type={'submit'}
                color={'green'}
                icon={<PlayCircleIcon />}
                title={'Iniciar nova tarefa'}
                aria-label={'Iniciar nova tarefa'}
              />
            ) : (
              <Button
                key={'button'}
                type={'button'}
                color={'red'}
                icon={<StopCircleIcon />}
                title={'Interromper tarefa'}
                aria-label={'Interromper tarefa'}
                onClick={handleInterruptTask}
              />
            )}
          </div>
        </form>
      </Container>
    </>
  )
}
