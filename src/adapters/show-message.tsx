import { ToastConfirm, ToastConfirmProps } from '../components/toast-confirm'

import { toast } from 'react-toastify'

export const showMessage = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warn: (message: string) => toast.warn(message),
  warning: (message: string) => toast.warning(message),
  info: (message: string) => toast.info(message),
  dismiss: () => toast.dismiss(),
  confirm: ({
    onClose,
    onConfirm,
    onCancel,
    ...props
  }: ToastConfirmProps & {
    onClose?: (confirmation: boolean) => void
  }) => {
    toast.dismiss()
    toast(
      ({ closeToast }) => (
        <ToastConfirm
          onCancel={() => {
            onCancel?.()
            onClose?.(false)
            closeToast()
          }}
          onConfirm={() => {
            onConfirm?.()
            onClose?.(true)
            closeToast()
          }}
          {...props}
        />
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    )
  },
}
