import type { ChangeEventHandler, FC, FormEvent, ReactNode } from "react"
import { useState } from "react"

import { Button, TextField, Typography, Alert } from "@mui/material"

import { StyledFormBox } from "../styledComponents"
import { getAuthErrorMessage } from "../../utils/getAuthErrorMessage"
import { PasswordRequirementList } from "./PasswordRequirementList"

type Props = {
  children?: ReactNode
  handleSubmit: (username: string, password: string) => Promise<void>
  shouldConfirmPassword: boolean
  title: string
  loadingText: string
}

export const LogIn: FC<Props> = ({
  children,
  handleSubmit,
  loadingText,
  shouldConfirmPassword,
  title,
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPasswordValid, setPasswordValid] = useState(!shouldConfirmPassword)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)

  const isSubmitDisabled = isLoading || !email || !password || !isPasswordValid

  const updatePasswordValidity = (isValid: boolean) => {
    if (isValid !== isPasswordValid) {
      setPasswordValid(isValid)
    }
  }

  const handleInputChange =
    (setState: (value: string) => void): ChangeEventHandler<HTMLInputElement> =>
    (e) =>
      setState(e.target.value)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
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
        <>
          <TextField
            required
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            variant="outlined"
            onChange={handleInputChange(setConfirmPassword)}
          />
          <PasswordRequirementList
            confirmPassword={confirmPassword}
            password={password}
            updatePasswordValidity={updatePasswordValidity}
          />
        </>
      ) : null}
      <Button
        color="primary"
        disabled={isSubmitDisabled}
        type="submit"
        variant="contained"
      >
        {isLoading ? loadingText : title}
      </Button>
      {children}
    </StyledFormBox>
  )
}
