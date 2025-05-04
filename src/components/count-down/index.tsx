import styles from './styles.module.css'
import { useTaskContext } from '../../contexts/task-context/use-task-context'

export function CountDown() {
  const {
    data: { formattedSecondsRemaining },
  } = useTaskContext()

  return <div className={styles.container}>{formattedSecondsRemaining}</div>
}
