import { useEffect, useMemo, type FC } from "react"
import { Box, Typography, List } from "@mui/material"
import { styled } from "@mui/material/styles"

import { PasswordRequirement } from "./PasswordRequirement"

const StyledTypography = styled(Typography)({
  marginBottom: 0,
  fontWeight: "bold",
})

type Props = {
  password: string
  confirmPassword: string
  updatePasswordValidity: (isValid: boolean) => void
}

export const PasswordRequirementList: FC<Props> = ({
  password,
  confirmPassword,
  updatePasswordValidity,
}) => {
  const requirements = useMemo(
    () => [
      { label: "At least 6 characters long", regex: /.{6,}/ },
      { label: "Contains at least one uppercase letter", regex: /[A-Z]/ },
      { label: "Contains at least one lowercase letter", regex: /[a-z]/ },
      { label: "Contains at least one numeric character", regex: /\d/ },
      {
        label: "Contains at least one special character",
        regex: /[!@#$%^&*(),.?":{}|<>]/,
      },
    ],
    []
  )

  const hasMatchingPasswords = password === confirmPassword

  useEffect(() => {
    const meetsAllRequirements =
      requirements.every((req) => req.regex.test(password)) &&
      hasMatchingPasswords
    updatePasswordValidity(meetsAllRequirements)
  }, [hasMatchingPasswords, password, requirements, updatePasswordValidity])

  return (
    <Box>
      <StyledTypography gutterBottom variant="subtitle2">
        Password Requirements
      </StyledTypography>
      <List>
        {requirements.map((req) => (
          <PasswordRequirement
            key={req.label}
            isValid={req.regex.test(password)}
            label={req.label}
          />
        ))}
        <PasswordRequirement
          isValid={hasMatchingPasswords}
          label="Password and confirmation must match"
        />
      </List>
    </Box>
  )
}
