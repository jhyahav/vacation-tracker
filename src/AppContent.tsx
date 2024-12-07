import type { FC } from "react"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { DashboardPage } from "./pages/DashboardPage"
import { LoginPage } from "./pages/LoginPage"

export const AppPageContent: FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<DashboardPage />} path="*" />
      </Routes>
    </Router>
  )
}
