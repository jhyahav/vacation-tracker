import type { FC } from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import { useAuth } from "./global-state/AuthContext"
import { DashboardPage } from "./pages/DashboardPage"
import { LoginPage } from "./pages/LoginPage"
import { SignUpPage } from "./pages/SignUpPage"

export const AppContent: FC = () => {
  const { user } = useAuth()

  return (
    <Router>
      <Routes>
        <Route
          element={user ? <DashboardPage /> : <Navigate replace to="/login" />}
          path="/"
        />
        <Route
          element={user ? <Navigate replace to="/" /> : <LoginPage />}
          path="/login"
        />
        <Route
          element={user ? <Navigate replace to="/" /> : <SignUpPage />}
          path="/signup"
        />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </Router>
  )
}
