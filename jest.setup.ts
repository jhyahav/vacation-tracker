import "@testing-library/jest-dom"
import { TextEncoder, TextDecoder } from "util"

globalThis.TextEncoder = TextEncoder
// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalThis.TextDecoder = TextDecoder as any
