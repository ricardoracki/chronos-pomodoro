import { RouterLink } from '../router-link'
import styles from './styles.module.css'

export function Footer() {
  return (
    <footer className={styles.container}>
      <RouterLink href={'/about-pomodoro'}>
        Entenda como funciona a técnica pomodoro
      </RouterLink>
      <RouterLink href="/">
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚
      </RouterLink>
    </footer>
  )
}
