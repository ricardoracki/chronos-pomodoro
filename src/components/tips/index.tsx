import { getNextCycle } from '../../utils/get-next-cycle'
import { getNextCycleType } from '../../utils/get-next-cycle-type'
import { useTaskContext } from '../../contexts/task-context/use-task-context'

export function Tips() {
  const { data } = useTaskContext()

  const nextCycle = getNextCycle(data.currentCycle)
  const nextCycleType = getNextCycleType(nextCycle)

  // tips
  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        <strong>Foque</strong> por <strong>{data.config.workTime}min</strong>
      </span>
    ),
    shortBreakTime: (
      <span>
        <strong>Descanse</strong> por{' '}
        <strong>{data.config.shortBreakTime}min</strong>
      </span>
    ),
    longBreakTime: (
      <span>
        <strong>Descanso</strong> longo
      </span>
    ),
  }
  const tipsForNoActiveTask = {
    workTime: (
      <span>
        Próximo ciclo é de <strong>{data.config.workTime}min</strong>
      </span>
    ),
    shortBreakTime: (
      <span>
        Próximo descanso é de <strong>{data.config.shortBreakTime}min</strong>
      </span>
    ),
    longBreakTime: (
      <span>
        Próximo descanso é de <strong>{data.config.longBreakTime}min</strong>
      </span>
    ),
  }

  return (
    <>
      {!!data.activeTask && tipsForWhenActiveTask[data.activeTask.type]}
      {!data.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  )
}
