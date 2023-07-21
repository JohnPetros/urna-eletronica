import { Field } from "./Field";

export function Display() {
  return (
    <div className="bg-zinc-100 border border-zinc-800 p-6">
      <strong className="uppercase text-xl block pr-8">Deputado federal</strong>

      <div className="flex gap-1 mt-4">
        <Field number={8} />
        <Field number={8} />
        <Field number={8} />
      </div>
    </div>
  )
}
