import type { FC } from "react"
import { Link } from "react-router-dom"

import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { LogIn } from "../components/auth/LogIn"
import { useAuth } from "../global-state/AuthContext"
import { useRedirectToDashboard } from "../hooks/useRedirectToDashboard"

const StyledLink = styled(Link)({
  fontWeight: "bold",
})
export const LoginPage: FC = () => {
  const { signIn } = useAuth()

  useRedirectToDashboard()

  return (
    <LogIn handleSubmit={signIn} shouldConfirmPassword={false} title="Log In">
      <Typography>
        Don&apos;t have an account yet?{" "}
        <StyledLink to="/signup">Sign up now</StyledLink>
      </Typography>
    </LogIn>
  )
}
