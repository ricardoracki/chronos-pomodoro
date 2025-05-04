import './styles/global.css'

import { MainRouter } from './routers/main-router'
import { MessagesContainer } from './components/messages-container'
import { TaskContextProvider } from './contexts/task-context/task-context-provider'

export function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer />
      <MainRouter />
    </TaskContextProvider>
  )
}
