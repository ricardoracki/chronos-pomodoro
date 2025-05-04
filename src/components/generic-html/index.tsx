import { PropsWithChildren } from 'react'
import styles from './styles.module.css'

export function GenericHTML({ children }: PropsWithChildren) {
  return <div className={styles.genericHtml}>{children}</div>
}
