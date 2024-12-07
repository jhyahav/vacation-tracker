import type { FC } from "react"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { DashboardPage } from "./pages/DashboardPage"
import { LoginPage } from "./pages/LoginPage"
import { SignUpPage } from "./pages/SignUpPage"

export const AppContent: FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<DashboardPage />} path="*" />
      </Routes>
    </Router>
  )
}
