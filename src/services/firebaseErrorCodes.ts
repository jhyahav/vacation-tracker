export const FirebaseErrorCodes = {
  EMAIL_ALREADY_EXISTS: "auth/email-already-in-use",
  INVALID_EMAIL: "auth/invalid-email",
  INVALID_CREDENTIAL: "auth/invalid-credential",
  INVALID_PASSWORD: "auth/invalid-password",
  PASSWORD_DOES_NOT_MEET_REQUIREMENTS:
    "auth/password-does-not-meet-requirements",
  TOO_MANY_REQUESTS: "auth/too-many-requests",
  UID_ALREADY_EXISTS: "auth/uid-already-exists",
} as const

type ErrorKey = (typeof FirebaseErrorCodes)[keyof typeof FirebaseErrorCodes]

export const isErrorKey = (key: string | null): key is ErrorKey =>
  key !== null && (Object.values(FirebaseErrorCodes) as string[]).includes(key)

export const FirebaseAuthErrorMessages: Record<ErrorKey, string> = {
  [FirebaseErrorCodes.EMAIL_ALREADY_EXISTS]:
    "This email is already associated with an account.",
  [FirebaseErrorCodes.INVALID_EMAIL]: "Invalid email address.",
  [FirebaseErrorCodes.INVALID_CREDENTIAL]: "Invalid login credentials.",
  [FirebaseErrorCodes.INVALID_PASSWORD]:
    "Password must be at least 6 characters long.",
  [FirebaseErrorCodes.PASSWORD_DOES_NOT_MEET_REQUIREMENTS]:
    "Password does not meet requirements.",
  [FirebaseErrorCodes.TOO_MANY_REQUESTS]: "Too many requests. Try again later.",
  [FirebaseErrorCodes.UID_ALREADY_EXISTS]: "UID is already in use.",
}
