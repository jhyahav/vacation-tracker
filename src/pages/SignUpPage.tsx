import type { FC } from "react"

import { Typography } from "@mui/material"

import { LogIn } from "../components/auth/LogIn"
import { StyledLink } from "../components/styledComponents"
import { useAuth } from "../global-state/AuthContext"
import { useRedirectToDashboard } from "../hooks/useRedirectToDashboard"
import { useHandleLogin } from "../hooks/useHandleLogin"

export const SignUpPage: FC = () => {
  const { signUp } = useAuth()
  const handleSubmit = useHandleLogin(signUp)

  useRedirectToDashboard()

  return (
    <LogIn
      shouldConfirmPassword
      handleSubmit={handleSubmit}
      loadingText="Registering..."
      title="Sign Up"
    >
      <Typography>
        Already have an account? <StyledLink to="/login">Log in</StyledLink>
      </Typography>
    </LogIn>
  )
}
