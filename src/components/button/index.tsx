import styles from './styles.module.css'

export function Button({
  icon,
  children,
  color = 'green',
  size = 'default',
  ...props
}: {
  icon?: React.ReactNode
  color?: 'green' | 'red'
  size?: 'default' | 'icon' | 'fit'
} & React.ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[color]}`}
      data-size={size}
    >
      {icon} {children}
    </button>
  )
}
