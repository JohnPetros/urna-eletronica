'use client'
interface InputProps {
  id: string
  type: string
  label: string
  hasFocus?: boolean
}

export function Input({ id, type, label, hasFocus = false }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="text-zinc-900 font-bold text-lg block">
        {label}
      </label>
      <input
        type={type}
        id={id}
        autoFocus={hasFocus}
        className="border border-transparent mt-2 border-zinc-900 focus:border-blue-900 p-2 w-full transition-colors duration-200"
      />
    </div>
  )
}
