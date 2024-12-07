import {
  FirebaseAuthErrorMessages,
  isErrorKey,
} from "../services/firebaseErrorCodes"

export const getAuthErrorMessage = (err: unknown): string => {
  const errorCode = extractErrorCode(err)
  const isKnownError = isErrorKey(errorCode)
  const errorMessage = isKnownError
    ? FirebaseAuthErrorMessages[errorCode]
    : "An unexpected error occured. Please try again."

  return errorMessage
}

const extractErrorCode = (err: unknown) => {
  // narrow types of err and message
  if (
    !(
      err &&
      typeof err === "object" &&
      "message" in err &&
      typeof err.message === "string"
    )
  ) {
    return null
  }
  const errorCodeRegex = /\(([^)]+)\)/
  const match = err.message.match(errorCodeRegex)
  const errorCode = match ? match[1] : null
  return errorCode
}
