import type { BoxProps } from "@mui/material"
import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import type { ElementType } from "react"

export const StyledPageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  color: theme.palette.text.primary,
}))

type StyledBoxProps = BoxProps & {
  component?: ElementType
}

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
