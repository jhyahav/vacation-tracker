import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

import { LogOutButton } from "../../auth/LogOutButton"
import { AddCity } from "./AddCity"

const StyledHeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  width: "100%",
  position: "sticky",
  top: 0,
  zIndex: 10,
}))

const DashboardHeader = () => {
  return (
    <StyledHeaderContainer>
      <AddCity />
      <LogOutButton />
    </StyledHeaderContainer>
  )
}

export default DashboardHeader
