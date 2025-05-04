import styles from './styles.module.css'

export function Input({
  labelText,
  ...props
}: { labelText?: string } & React.ComponentProps<'input'>) {
  return (
    <>
      {labelText && <label htmlFor={props.id}>{labelText}</label>}
      <input {...props} className={styles.input} />
    </>
  )
}
