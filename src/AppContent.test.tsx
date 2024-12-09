import { render, screen } from "@testing-library/react"
import { AppContent } from "./AppContent"
import { useAuth } from "./global-state/AuthContext"

jest.mock("./global-state/AuthContext", () => ({
  useAuth: jest.fn(),
}))

jest.mock("./pages/DashboardPage", () => ({
  DashboardPage: () => <div data-testid="dashboard-page">DashboardPage</div>,
}))

jest.mock("./pages/LoginPage", () => ({
  LoginPage: () => <div data-testid="login-page">LoginPage</div>,
}))

jest.mock("./pages/SignUpPage", () => ({
  SignUpPage: () => <div data-testid="signup-page">SignUpPage</div>,
}))

describe("AppContent", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the DashboardPage for an authenticated user on '/'", () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      user: { email: "user@example.com" },
    })

    render(<AppContent />)

    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument()
  })

  it("redirects to LoginPage for an unauthenticated user on '/'", () => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: null })

    render(<AppContent />)

    expect(screen.getByTestId("login-page")).toBeInTheDocument()
  })

  it("redirects an authenticated user away from /login to DashboardPage", () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      user: { email: "user@example.com" },
    })

    window.history.pushState({}, "Log In", "/login")

    render(<AppContent />)

    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument()
  })

  it("renders the SignUpPage for an unauthenticated user on '/signup'", () => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: null })

    window.history.pushState({}, "Sign Up", "/signup")

    render(<AppContent />)

    expect(screen.getByTestId("signup-page")).toBeInTheDocument()
  })

  it("redirects to DashboardPage for authenticated user on unknown routes", () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      user: { email: "user@example.com" },
    })

    window.history.pushState({}, "Nonexistent", "/nonexistent")

    render(<AppContent />)

    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument()
  })
})
