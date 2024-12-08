import { useDashboard } from "../global-state/DashboardContext"

export const useHandleLogin = (
  loginFunc: (email: string, password: string) => Promise<void>
) => {
  const { updateEmail } = useDashboard()

  const handleSubmit = async (email: string, password: string) => {
    await loginFunc(email, password)
    // register logged in email in dashboard context
    updateEmail(email)
  }

  return handleSubmit
}
