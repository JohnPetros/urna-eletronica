'use client'
import { InputHTMLAttributes, forwardRef, useId } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => {
    const id = useId()

    return (
      <div>
        <label htmlFor={id} className="text-zinc-900 font-bold text-lg block">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className="border border-transparent mt-2 border-zinc-900 focus:border-blue-900 p-2 w-full transition-colors duration-200 rounded"
          {...rest}
        />
        {error && <strong className="text-red-600 font-normal">{error}</strong>}
      </div>
    )
  }
)
