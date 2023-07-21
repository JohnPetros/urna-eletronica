import { twMerge } from 'tailwind-merge'

interface KeyProps {
  value: string
  className?: string
}

export function Key({ value, className }: KeyProps) {
  return (
    <button
      className={twMerge(
        'bg-zinc-800 text-zinc-100 rounded-lg py-2 px-8 border-b-2 border-zinc-300 uppercase',
        className
      )}
    >
      {value}
    </button>
  )
}
