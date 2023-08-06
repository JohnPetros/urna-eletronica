import type { Image } from "./Image"

export type Candidate = {
  number: string
  name: string
  party: string
  images: Image[]
  alternates?: string[]
}
