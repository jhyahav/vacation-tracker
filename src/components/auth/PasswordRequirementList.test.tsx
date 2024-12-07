import { render, screen } from "@testing-library/react"
import { PasswordRequirementList } from "./PasswordRequirementList"

const requirements = [
  "At least 6 characters long",
  "Contains at least one uppercase letter",
  "Contains at least one lowercase letter",
  "Contains at least one numeric character",
  "Contains at least one special character",
  "Password and confirmation must match",
]

describe("PasswordRequirementList", () => {
  const mockUpdatePasswordValidity = jest.fn()

  const renderComponent = (password: string, confirmPassword: string) =>
    render(
      <PasswordRequirementList
        confirmPassword={confirmPassword}
        password={password}
        updatePasswordValidity={mockUpdatePasswordValidity}
      />
    )

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders all password requirements", () => {
    renderComponent("", "")

    requirements.forEach((requirement) => {
      expect(screen.getByText(requirement)).toBeInTheDocument()
    })
  })

  it("marks requirements as valid when the password meets them", () => {
    renderComponent("Passw0rd!", "Passw0rd!")

    requirements.forEach((requirement) => {
      expect(screen.getByTestId(requirement)).toHaveAttribute(
        "data-test-valid",
        "valid"
      )
    })
  })

  it("calls updatePasswordValidity with true when all requirements are met", () => {
    renderComponent("Passw0rd!", "Passw0rd!")
    expect(mockUpdatePasswordValidity).toHaveBeenCalledWith(true)
  })

  it("calls updatePasswordValidity with false when a requirement is not met", () => {
    renderComponent("short", "short")
    expect(mockUpdatePasswordValidity).toHaveBeenCalledWith(false)
  })

  it("shows mismatched password requirement as invalid", () => {
    renderComponent("Passw0rd!", "Different!")
    expect(
      screen.getByTestId("Password and confirmation must match")
    ).toHaveAttribute("data-test-valid", "invalid")
  })
})
