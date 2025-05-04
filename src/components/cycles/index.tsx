import { getNextCycle } from '../../utils/get-next-cycle'
import { getNextCycleType } from '../../utils/get-next-cycle-type'
import styles from './styles.module.css'
import { useTaskContext } from '../../contexts/task-context/use-task-context'

export function Cycles() {
  const { data } = useTaskContext()

  const cycleSteps = Array.from({ length: data.currentCycle })

  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  }

  return (
    <div className={styles.container}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cycleSteps.map((_, index) => {
          const nextCycle = getNextCycle(index)
          const nextCycleType = getNextCycleType(nextCycle)

          return (
            <span
              key={`${nextCycle} ${nextCycleType}`}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              title={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
            />
          )
        })}
      </div>
    </div>
  )
}
