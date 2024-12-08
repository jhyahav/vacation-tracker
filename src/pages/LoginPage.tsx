import type { FC } from "react"

import { Typography } from "@mui/material"

import { LogIn } from "../components/auth/LogIn"
import { StyledLink } from "../components/styledComponents"
import { useAuth } from "../global-state/AuthContext"
import { useRedirectToDashboard } from "../hooks/useRedirectToDashboard"
import { useHandleLogin } from "../hooks/useHandleLogin"

export const LoginPage: FC = () => {
  const { signIn } = useAuth()
  const handleSubmit = useHandleLogin(signIn)

  useRedirectToDashboard()

  return (
    <LogIn
      handleSubmit={handleSubmit}
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
