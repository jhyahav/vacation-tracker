import type { ElementType } from "react"
import { Link } from "react-router-dom"

import type { BoxProps } from "@mui/material"
import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

type StyledBoxProps = BoxProps & {
  component?: ElementType
}

export const StyledLogInContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
})

export const StyledFormBox = styled(Box)<StyledBoxProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: 320,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}))

export const StyledLink = styled(Link)({
  fontWeight: "bold",
})
