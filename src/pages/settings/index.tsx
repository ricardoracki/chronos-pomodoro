import { useEffect, useRef } from 'react'

import { Button } from '../../components/button'
import { Container } from '../../components/container'
import { Heading } from '../../components/heading'
import { Input } from '../../components/input'
import { MainTemplate } from '../../templates/main-template'
import { SaveIcon } from 'lucide-react'
import { TaskActionTypes } from '../../contexts/task-context/task-actions'
import { showMessage } from '../../adapters/show-message'
import { useTaskContext } from '../../contexts/task-context/use-task-context'

export function Settings() {
  const workTimeInputRef = useRef<HTMLInputElement>(null)
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null)
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null)

  const { dispatch, data } = useTaskContext()

  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro'
  }, [])

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formErrors = []

    const workTime = Number(workTimeInputRef.current?.value)
    const shortBreakTime = Number(shortBreakTimeInputRef.current?.value)
    const longBreakTime = Number(longBreakTimeInputRef.current?.value)

    //Validações de tipos
    if (isNaN(workTime)) formErrors.push('Tempo de foco inválido')

    if (isNaN(shortBreakTime))
      formErrors.push('Tempo de descanso curto inválido')

    if (isNaN(longBreakTime))
      formErrors.push('Tempo de descanso longo inválido')

    if (formErrors.length) return formErrors.forEach(showMessage.error)

    //Validações de valores
    if (workTime < 1 || workTime > 60)
      formErrors.push('Tempo de foco deve estar entre 1 e 60 minutos')

    if (shortBreakTime < 1 || shortBreakTime > 30)
      formErrors.push('Tempo de descanso curto deve estar entre 1 e 30 minutos')

    if (longBreakTime < 1 || longBreakTime > 60)
      formErrors.push('Tempo de descanso longo deve estar entre 1 e 60 minutos')

    if (formErrors.length) return formErrors.forEach(showMessage.error)

    dispatch({
      type: TaskActionTypes.SET_SETTINGS,
      payload: { config: { longBreakTime, shortBreakTime, workTime } },
    })
    showMessage.success('Configurações salvas com sucesso!')
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curto e
          descanso longo
        </p>
      </Container>

      <Container>
        <form className="form" onSubmit={handleSave}>
          <div className="formRow">
            <Input
              id="workTime"
              type="number"
              labelText="Tempo de foco"
              ref={workTimeInputRef}
              defaultValue={data.config.workTime}
            />
          </div>
          <div className="formRow">
            <Input
              id="shortBreakTime"
              type="number"
              labelText="Tempo de descanso curto"
              ref={shortBreakTimeInputRef}
              defaultValue={data.config.shortBreakTime}
            />
          </div>
          <div className="formRow">
            <Input
              id="longBreakTime"
              type="number"
              labelText="Tempo de descanso longo"
              ref={longBreakTimeInputRef}
              defaultValue={data.config.longBreakTime}
            />
          </div>

          <div className="formRow">
            <Button
              icon={<SaveIcon />}
              type="submit"
              aria-label="salvar configurações"
              title="Salvar configurações"
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  )
}
