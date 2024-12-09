import { render, screen } from "@testing-library/react"
import { toast } from "react-toastify"
import { useUnsplashPhoto } from "../../../../hooks/queries/useUnsplashPhoto"
import { SkylinePhoto } from "./SkylinePhoto"

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}))

jest.mock("../../../../hooks/queries/useUnsplashPhoto", () => ({
  useUnsplashPhoto: jest.fn(),
}))

describe("SkylinePhoto", () => {
  it("renders a Skeleton while loading", () => {
    ;(useUnsplashPhoto as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    })

    render(<SkylinePhoto cityName="Berlin" />)

    expect(screen.getByTestId("photo-skeleton")).toBeInTheDocument()
  })

  it("renders a Skeleton when cityName is undefined", () => {
    ;(useUnsplashPhoto as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    })

    render(<SkylinePhoto cityName={undefined} />)

    expect(screen.getByTestId("photo-skeleton")).toBeInTheDocument()
  })

  it("shows an error toast when there's an error fetching the photo", () => {
    const mockError = { message: "Network error" }

    ;(useUnsplashPhoto as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: mockError,
    })

    render(<SkylinePhoto cityName="Berlin" />)

    expect(toast.error).toHaveBeenCalledWith(
      "Error fetching photo: Network error"
    )
  })

  it("renders the photo when data is successfully fetched", () => {
    const mockPhoto = {
      user: { name: "John Doe" },
      urls: { regular: "https://example.com/photo.jpg" },
    }

    ;(useUnsplashPhoto as jest.Mock).mockReturnValue({
      data: mockPhoto,
      isLoading: false,
      isError: false,
      error: null,
    })

    render(<SkylinePhoto cityName="Berlin" />)

    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("src", mockPhoto.urls.regular)
    expect(img).toHaveAttribute("alt", "Photo by John Doe")
  })
})
