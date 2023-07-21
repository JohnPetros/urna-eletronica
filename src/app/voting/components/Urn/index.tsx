import React from 'react'
import { Display } from './Display'
import { Keyboard } from './Keyboard'

export function Urn() {

  return (
    <div className="bg-zinc-300 w-[800px] grid grid-cols-[1fr_320px] gap-6 border border-zinc-100 p-8">
      <Display />
      <Keyboard />
    </div>
  )
}
