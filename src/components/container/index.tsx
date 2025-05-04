import { PropsWithChildren } from 'react'
import styles from './styles.module.css'

export function Container({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
