import { BrowserRouter, Route, Routes, useLocation } from 'react-router'

import { AboutPomodoro } from '../../pages/about-pomodoro'
import { History } from '../../pages/history'
import { Home } from '../../pages/home'
import { NotFound } from '../../pages/not-found'
import { Settings } from '../../pages/settings'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={AboutPomodoro} path="/about-pomodoro/" />
        <Route Component={History} path="/history/" />
        <Route Component={Settings} path="/settings/" />
        <Route Component={NotFound} path="*" />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  )
}
