import { render, screen, fireEvent } from "@testing-library/react"
import { toast } from "react-toastify"
import { Destination } from "./Destination"
import { useCityData } from "../../../hooks/useCityData"
import { useDashboard } from "../../../global-state/DashboardContext"

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}))

jest.mock("../../../hooks/useCityData", () => ({
  useCityData: jest.fn(),
}))

jest.mock("../../../global-state/DashboardContext", () => ({
  useDashboard: jest.fn(),
}))

jest.mock("./widgets/SkylinePhoto", () => ({
  SkylinePhoto: jest.fn(() => <div data-testid="skyline-photo" />),
}))

jest.mock("./widgets/WeatherWidget", () => ({
  WeatherWidget: jest.fn(() => <div data-testid="weather-widget" />),
}))

jest.mock("./widgets/ClockWidget", () => ({
  ClockWidget: jest.fn(() => <div data-testid="clock-widget" />),
}))

describe("Destination", () => {
  const mockDeleteDestination = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useDashboard as jest.Mock).mockReturnValue({
      deleteDestination: mockDeleteDestination,
    })
  })

  it("renders skeletons while loading", () => {
    ;(useCityData as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      name: null,
      countryName: null,
    })

    render(<Destination cityName="Berlin" />)

    expect(screen.getAllByTestId("card-header-skeleton")).toHaveLength(2) // For title and subheader
    expect(screen.getByTestId("skyline-photo")).toBeInTheDocument()
  })

  it("displays an error toast and deletes the destination on error", () => {
    const mockError = { message: "Network error" }

    ;(useCityData as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      error: mockError,
    })

    render(<Destination cityName="Berlin" />)

    expect(toast.error).toHaveBeenCalledWith("Berlin: Network error", {
      toastId: "Network error-Berlin",
    })
    expect(mockDeleteDestination).toHaveBeenCalledWith({ cityName: "Berlin" })
  })

  it("renders widgets when city data is successfully fetched", () => {
    const mockCityData = {
      isLoading: false,
      isError: false,
      name: "Berlin",
      countryName: "Germany",
      conditions: "Clear",
      getTime: jest.fn(),
      temp: 15,
      weatherDescription: "Clear skies",
      weatherIcon: "01d",
    }

    ;(useCityData as jest.Mock).mockReturnValue(mockCityData)

    render(<Destination cityName="Berlin" />)

    expect(screen.getByText("Germany")).toBeInTheDocument()
    expect(screen.getByText("Berlin")).toBeInTheDocument()
    expect(screen.getByTestId("skyline-photo")).toBeInTheDocument()
    expect(screen.getByTestId("weather-widget")).toBeInTheDocument()
    expect(screen.getByTestId("clock-widget")).toBeInTheDocument()
  })

  it("calls deleteDestination when the delete button is clicked", () => {
    const mockCityData = {
      isLoading: false,
      isError: false,
      name: "Berlin",
      countryName: "Germany",
    }

    ;(useCityData as jest.Mock).mockReturnValue(mockCityData)

    render(<Destination cityName="Berlin" />)

    const deleteButton = screen.getByLabelText("delete")
    fireEvent.click(deleteButton)

    expect(mockDeleteDestination).toHaveBeenCalledWith({ cityName: "Berlin" })
  })
})
