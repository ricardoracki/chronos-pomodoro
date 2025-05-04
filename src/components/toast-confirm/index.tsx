import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'

import { Button } from '../button'
import styles from './styles.module.css'

export type ToastConfirmProps = {
  message: string
  onConfirm?: () => void
  onCancel?: () => void
}

export function ToastConfirm({
  message,
  onConfirm,
  onCancel,
}: ToastConfirmProps) {
  return (
    <div className={styles.toastConfirm}>
      <p>{message}</p>
      <div>
        <Button
          size="icon"
          icon={<ThumbsUpIcon />}
          color="green"
          onClick={() => onConfirm?.()}
        />
        <Button
          size="icon"
          icon={<ThumbsDownIcon />}
          color="red"
          onClick={() => onCancel?.()}
        />
      </div>
    </div>
  )
}
