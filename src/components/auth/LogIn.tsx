import type { ChangeEventHandler, FC, FormEvent, ReactNode } from "react"
import { useState } from "react"

import { Button, TextField, Typography, Alert } from "@mui/material"

import { StyledFormBox } from "../styledComponents"
import { getAuthErrorMessage } from "../../utils/getAuthErrorMessage"

type Props = {
  children?: ReactNode
  handleSubmit: (username: string, password: string) => Promise<void>
  shouldConfirmPassword: boolean
  title: string
}

export const LogIn: FC<Props> = ({
  children,
  handleSubmit,
  shouldConfirmPassword,
  title,
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)

  const isSubmitDisabled =
    isLoading ||
    !email ||
    !password ||
    (shouldConfirmPassword && !confirmPassword)

  const handleInputChange =
    (setState: (value: string) => void): ChangeEventHandler<HTMLInputElement> =>
    (e) =>
      setState(e.target.value)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    // TODO: compare confirm passsword to password
    // TODO: verify password meets requirements set in firebase config
    setError(null)

    try {
      setLoading(true)
      await handleSubmit(email, password)
    } catch (err) {
      const messsage = getAuthErrorMessage(err)
      setError(messsage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyledFormBox component="form" onSubmit={handleLogin}>
      <Typography gutterBottom align="center" variant="h4">
        {title}
      </Typography>

      {error ? <Alert severity="error">{error}</Alert> : null}

      <TextField
        required
        label="Email"
        type="email"
        value={email}
        variant="outlined"
        onChange={handleInputChange(setEmail)}
      />
      <TextField
        required
        label="Password"
        type="password"
        value={password}
        variant="outlined"
        onChange={handleInputChange(setPassword)}
      />
      {shouldConfirmPassword ? (
        <TextField
          required
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          variant="outlined"
          onChange={handleInputChange(setConfirmPassword)}
        />
      ) : null}
      <Button
        color="primary"
        disabled={isSubmitDisabled}
        type="submit"
        variant="contained"
      >
        {isLoading ? "Logging in..." : title}
      </Button>
      {children}
    </StyledFormBox>
  )
}
