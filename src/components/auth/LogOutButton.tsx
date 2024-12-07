import type { FC } from "react"
import { Button } from "@mui/material"

import { useAuth } from "../../global-state/AuthContext"

export const LogOutButton: FC = () => {
  const { user, signOut } = useAuth()

  // The button shouldn't render if the user isn't logged in
  if (!user) return null

  const handleClick = async () => await signOut()

  return (
    <Button color="primary" variant="contained" onClick={handleClick}>
      Log Out
    </Button>
  )
}
