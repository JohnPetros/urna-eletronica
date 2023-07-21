interface FieldProps {
  number: number
}

export function Field({ number }: FieldProps) {
  return <span className="border-2 border-zinc-900 py-2 px-4 font-extrabold text-lg">{number}</span>
}
