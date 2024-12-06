import type { ChangeEventHandler, FC, FormEvent } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button, TextField, Typography, Alert } from "@mui/material"

import { useAuth } from "../global-state/AuthContext"
import {
  StyledFormBox,
  StyledPageContainer,
} from "../components/styledComponents"

export const LoginPage: FC = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setEmail(e?.target?.value)

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target.value)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      setLoading(true)
      await signIn(email, password)
      navigate("/dashboard")
    } catch (err) {
      console.error("Login failed", err)
      setError("Failed to log in. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyledPageContainer>
      <StyledFormBox component="form" onSubmit={handleLogin}>
        <Typography gutterBottom align="center" variant="h4">
          Log In
        </Typography>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <TextField
          required
          label="Email"
          type="email"
          value={email}
          variant="outlined"
          onChange={handleEmailChange}
        />
        <TextField
          required
          label="Password"
          type="password"
          value={password}
          variant="outlined"
          onChange={handlePasswordChange}
        />
        <Button
          color="primary"
          disabled={isLoading || !email || !password}
          type="submit"
          variant="contained"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
      </StyledFormBox>
    </StyledPageContainer>
  )
}
