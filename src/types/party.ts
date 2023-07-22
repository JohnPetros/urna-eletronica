import type { Candidate } from './candidate'

export type Party = {
  title: string
  abbr: string
  number: number
  candidates: Candidate[]
}
