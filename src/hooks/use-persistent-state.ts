import { useEffect, useState } from 'react'

export const usePersistentState = <T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    const localData = localStorage.getItem(key)
    return localData ? (JSON.parse(localData) as T) : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state, key])

  return [state, setState]
}
