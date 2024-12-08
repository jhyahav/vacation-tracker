import { getAuthErrorMessage } from "./getAuthErrorMessage"
import {
  FirebaseAuthErrorMessages,
  FirebaseErrorCodes,
  isErrorKey,
} from "../services/firebaseErrorCodes"

jest.mock("../services/firebaseErrorCodes", () => {
  const originalModule = jest.requireActual("../services/firebaseErrorCodes")
  return {
    ...originalModule,
    isErrorKey: jest.fn(),
  }
})

describe("getAuthErrorMessage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return the correct error message for a known error code", () => {
    // Mock `isErrorKey` with a cast to `jest.MockedFunction` to satisfy TypeScript
    ;(isErrorKey as jest.MockedFunction<typeof isErrorKey>).mockImplementation(
      (key): key is typeof FirebaseErrorCodes.EMAIL_ALREADY_EXISTS =>
        key === FirebaseErrorCodes.EMAIL_ALREADY_EXISTS
    )

    const error = new Error("Firebase: Error (auth/email-already-in-use).")
    const result = getAuthErrorMessage(error)

    expect(isErrorKey).toHaveBeenCalledWith("auth/email-already-in-use")
    expect(result).toBe(
      FirebaseAuthErrorMessages[FirebaseErrorCodes.EMAIL_ALREADY_EXISTS]
    )
  })

  it("should return the default error message for an unknown error code", () => {
    ;(isErrorKey as jest.MockedFunction<typeof isErrorKey>).mockReturnValue(
      false
    )

    const error = new Error("Firebase: Error (auth/unknown-error).")
    const result = getAuthErrorMessage(error)

    expect(isErrorKey).toHaveBeenCalledWith("auth/unknown-error")
    expect(result).toBe("An unexpected error occured. Please try again.")
  })

  it("should return the default error message for an error without a message", () => {
    const error = { noMessage: true }
    const result = getAuthErrorMessage(error)

    expect(isErrorKey).toHaveBeenCalledWith(null)
    expect(result).toBe("An unexpected error occured. Please try again.")
  })

  it("should return the default error message for a message without a recognizable code", () => {
    const error = new Error("Random error message without code.")
    const result = getAuthErrorMessage(error)

    expect(isErrorKey).toHaveBeenCalledWith(null)
    expect(result).toBe("An unexpected error occured. Please try again.")
  })

  it("should handle null or undefined error gracefully", () => {
    const result = getAuthErrorMessage(null)

    expect(isErrorKey).toHaveBeenCalledWith(null)
    expect(result).toBe("An unexpected error occured. Please try again.")
  })

  it("should extract the correct error code from error message", () => {
    ;(isErrorKey as jest.MockedFunction<typeof isErrorKey>).mockReturnValue(
      true
    )

    const error = new Error("Firebase: Error (auth/invalid-email).")
    const result = getAuthErrorMessage(error)

    expect(isErrorKey).toHaveBeenCalledWith("auth/invalid-email")
    expect(result).toBe(
      FirebaseAuthErrorMessages[FirebaseErrorCodes.INVALID_EMAIL]
    )
  })
})
