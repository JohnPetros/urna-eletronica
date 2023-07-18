import { Input } from './Input'

export function Form() {
  return (
    <form className="max-w-sm mx-auto border-2 border-blue-900">
      <fieldset>
        <legend className="bg-blue-900 text-zinc-100 p-4 text-xl text-center">
          Antes de votar, insira nome e data de nascimento, por favor.
        </legend>
        <div className="space-y-4 p-4">
          <Input id="name" type="text" label="Nome" hasFocus />
          <Input id="birthdate" type="date" label="Data de nascimento" />
        </div>
      </fieldset>
      <footer className="p-4">
        <button
          className="bg-blue-900 text-zinc-100 text-lg w-full py-2 hover:bg-blue-700 transition-colors"
          type="submit"
        >
          Enviar
        </button>
      </footer>
    </form>
  )
}
