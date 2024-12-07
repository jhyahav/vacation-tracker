import type { FC } from "react"

import { Typography } from "@mui/material"

import { LogIn } from "../components/auth/LogIn"
import { StyledLink } from "../components/styledComponents"
import { useAuth } from "../global-state/AuthContext"
import { useRedirectToDashboard } from "../hooks/useRedirectToDashboard"

export const SignUpPage: FC = () => {
  const { signUp } = useAuth()

  useRedirectToDashboard()

  return (
    <LogIn shouldConfirmPassword handleSubmit={signUp} title="Sign Up">
      <Typography>
        Already have an account? <StyledLink to="/login">Log in</StyledLink>
      </Typography>
    </LogIn>
  )
}
