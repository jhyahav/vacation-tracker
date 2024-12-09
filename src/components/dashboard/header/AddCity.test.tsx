import { render, screen, fireEvent } from "@testing-library/react"
import { toast } from "react-toastify"
import { AddCity } from "./AddCity"
import { useDashboard } from "../../../global-state/DashboardContext"
import { sanitizeCityName } from "../../../utils/sanitizeCityName"

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}))

jest.mock("../../../global-state/DashboardContext", () => ({
  useDashboard: jest.fn(),
}))

jest.mock("../../../utils/sanitizeCityName", () => ({
  sanitizeCityName: jest.fn((name) => name.trim().toLowerCase()),
}))

describe("AddCity", () => {
  const mockCreateDestination = jest.fn()
  const mockReadDestinations = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useDashboard as jest.Mock).mockReturnValue({
      createDestination: mockCreateDestination,
      readDestinations: mockReadDestinations,
    })
  })

  it("updates state when typing in the input field", () => {
    mockReadDestinations.mockReturnValue([])

    render(<AddCity />)

    const input = screen.getByLabelText(/city name/i)
    fireEvent.change(input, { target: { value: "Berlin" } })

    expect(input).toHaveValue("Berlin")
  })

  it("adds a city when it is not a duplicate", () => {
    mockReadDestinations.mockReturnValue([{ cityName: "london" }])

    render(<AddCity />)

    const input = screen.getByLabelText(/city name/i)
    fireEvent.change(input, { target: { value: "Berlin" } })

    const addButton = screen.getByRole("button")
    fireEvent.click(addButton)

    expect(sanitizeCityName).toHaveBeenCalledWith("Berlin")
    expect(mockCreateDestination).toHaveBeenCalledWith({ cityName: "berlin" })
    expect(input).toHaveValue("")
  })

  it("prevents adding a duplicate city and shows a toast error", () => {
    mockReadDestinations.mockReturnValue([{ cityName: "berlin" }])

    render(<AddCity />)

    const input = screen.getByLabelText(/city name/i)
    fireEvent.change(input, { target: { value: "Berlin" } })

    const addButton = screen.getByRole("button")
    fireEvent.click(addButton)

    expect(sanitizeCityName).toHaveBeenCalledWith("Berlin")
    expect(toast.error).toHaveBeenCalledWith(
      "Berlin is already on your dashboard."
    )
    expect(mockCreateDestination).not.toHaveBeenCalled()
  })

  it("adds a city when pressing the Enter key", () => {
    mockReadDestinations.mockReturnValue([])

    render(<AddCity />)

    const input = screen.getByLabelText(/city name/i)
    fireEvent.change(input, { target: { value: "Berlin" } })
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" })

    expect(sanitizeCityName).toHaveBeenCalledWith("Berlin")
    expect(mockCreateDestination).toHaveBeenCalledWith({ cityName: "berlin" })
    expect(input).toHaveValue("")
  })

  it("does nothing when adding an empty or whitespace-only city name", () => {
    mockReadDestinations.mockReturnValue([])

    render(<AddCity />)

    const input = screen.getByLabelText(/city name/i)
    fireEvent.change(input, { target: { value: "   " } })

    const addButton = screen.getByRole("button")
    fireEvent.click(addButton)

    expect(sanitizeCityName).toHaveBeenCalledWith("   ")
    expect(mockCreateDestination).not.toHaveBeenCalled()
    expect(toast.error).not.toHaveBeenCalled()
  })
})
