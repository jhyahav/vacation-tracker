import type { FC } from "react"

import { Typography } from "@mui/material"

import { LogIn } from "../components/auth/LogIn"
import { StyledLink } from "../components/styledComponents"
import { useAuth } from "../global-state/AuthContext"
import { useRedirectToDashboard } from "../hooks/useRedirectToDashboard"

export const LoginPage: FC = () => {
  const { signIn } = useAuth()

  useRedirectToDashboard()

  return (
    <LogIn
      handleSubmit={signIn}
      loadingText="Logging in..."
      shouldConfirmPassword={false}
      title="Log In"
    >
      <Typography>
        Don&apos;t have an account yet?{" "}
        <StyledLink to="/signup">Sign up now</StyledLink>
      </Typography>
    </LogIn>
  )
}
