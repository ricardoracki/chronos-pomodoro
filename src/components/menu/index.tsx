import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react'

import { RouterLink } from '../router-link'
import styles from './styles.module.css'
import { useEffect } from 'react'
import { usePersistentState } from '../../hooks/use-persistent-state'

export function Menu() {
  const [theme, setTheme] = usePersistentState<'dark' | 'light'>(
    'theme',
    'dark'
  )

  function handleToggleTheme(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault()
    setTheme((v) => (v === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <nav className={styles.container}>
      <RouterLink
        href="/"
        className={styles.menuLink}
        aria-label="Ir para a Home"
        title="Ir para a Home"
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        href="/history"
        className={styles.menuLink}
        aria-label="Ver histórico"
        title="Ver histórico"
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        href="/settings"
        className={styles.menuLink}
        aria-label="Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </RouterLink>
      <RouterLink
        href="#"
        className={styles.menuLink}
        aria-label="Troca de tema"
        title="Troca de tema"
        onClick={handleToggleTheme}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </RouterLink>
    </nav>
  )
}
