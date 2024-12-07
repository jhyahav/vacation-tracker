import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../global-state/AuthContext"

export const useRedirectToDashboard = () => {
  const navigate = useNavigate()

  const { user } = useAuth()

  useEffect(() => {
    if (user) navigate("/dashboard")
  }, [navigate, user])
}
