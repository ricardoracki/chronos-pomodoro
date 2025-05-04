import { format } from 'date-fns'

export const formatDate = (
  timestamp: number | Date,
  formatStr: string = 'dd/MM/yyyy HH:mm'
) => format(new Date(timestamp), formatStr)
