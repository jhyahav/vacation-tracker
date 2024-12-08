import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledEmptyDashboardBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "1rem",
  height: "80vh",
})

export const EmptyDashboard = () => {
  return (
    <StyledEmptyDashboardBox>
      <Typography variant="h3">Add your first destination above!</Typography>
    </StyledEmptyDashboardBox>
  )
}
