import type { FC } from "react"
import { Button } from "@mui/material"

import { useAuth } from "../../global-state/AuthContext"
import { useDashboard } from "../../global-state/DashboardContext"

export const LogOutButton: FC = () => {
  const { user, signOut } = useAuth()
  const { updateEmail } = useDashboard()

  // The button shouldn't render if the user isn't logged in
  if (!user) return null

  const handleClick = async () => {
    await signOut()
    updateEmail(null)
  }

  return (
    <Button color="secondary" variant="contained" onClick={handleClick}>
      Log Out
    </Button>
  )
}
