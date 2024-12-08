import { render, screen, fireEvent } from "@testing-library/react"
import { LogIn } from "./LogIn"

jest.mock("../styledComponents", () => ({
  StyledFormBox: jest.fn(({ children }) => <form>{children}</form>),
  StyledLogInContainer: jest.fn(({ children }) => <div>{children}</div>),
}))

jest.mock("./PasswordRequirementList", () => ({
  PasswordRequirementList: jest.fn(() => <div>Password requirements</div>),
}))

jest.mock("../../utils/getAuthErrorMessage", () => ({
  getAuthErrorMessage: jest.fn(),
}))

describe("LogIn", () => {
  const handleSubmitMock = jest.fn()
  const defaultProps = {
    handleSubmit: handleSubmitMock,
    shouldConfirmPassword: false,
    title: "Log In",
    loadingText: "Loading...",
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly with required props", () => {
    render(<LogIn {...defaultProps} />)
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Log In"
    )
    expect(screen.getByTestId("email")).toBeInTheDocument()
    expect(screen.getByTestId("password")).toBeInTheDocument()
    expect(screen.queryByText("Password requirements")).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Log In" })).toBeDisabled()
  })

  it("renders confirm password field and requirements when `shouldConfirmPassword` is true", () => {
    render(<LogIn {...defaultProps} shouldConfirmPassword />)
    expect(screen.getByText("Confirm Password")).toBeInTheDocument()
    expect(screen.getByText("Password requirements")).toBeInTheDocument()
  })

  it("updates input fields correctly", () => {
    render(<LogIn {...defaultProps} />)
    const emailInput = screen.getByTestId("email")
    const passwordInput = screen.getByTestId("password")

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })

    expect(emailInput).toHaveValue("test@example.com")
    expect(passwordInput).toHaveValue("password123")
  })
})
