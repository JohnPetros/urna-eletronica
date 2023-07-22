import type { Image } from "./Image"

export type Candidate = {
  number: number
  name: string
  party: string
  images: Image[]
  alternates: string[]
}
