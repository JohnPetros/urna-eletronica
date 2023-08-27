import Image from 'next/image'
import { Key } from './Key'

const keys = new Array(9).fill('').map((_, index) => index + 1)

export function Keyboard() {
  return (
    <div>
      <header className="bg-zinc-200 flex items-center justify-between py-2 px-4">
        <Image
          src="/images/republica-logo.png"
          width={40}
          height={40}
          alt="Justiça eleitoral"
        />
        <h2 className="uppercase text-lg text-zinc-900 font-bold">
          Justiça eleitoral
        </h2>
      </header>
      <div className="grid grid-cols-[repeat(3,minmax(40px,140px))] w-full items-center justify-center gap-2 bg-zinc-600 p-6">
        {keys.map((key) => (
          <Key key={key} className="bg-zinc-800 w-full" value={String(key)} />
        ))}
        <Key className="bg-zinc-800 col-start-2 col-end-3" value="0" />

        <div className="col-span-3 grid grid-cols-3  gap-2 mt-3">
          <Key
            className="bg-zinc-100 text-zinc-800 md:w-auto md:px-2 py-2 text-[13px]"
            value="Branco"
            isAction={true}
            ariaLabel="Votar em branco"
          />
          <Key
            className="bg-orange-600 text-zinc-950 md:w-auto md:px-2 py-2 text-[13px]"
            value="Corrige"
            isAction={true}
            ariaLabel="Corrigir número"
          />
          <Key
            className="bg-green-600 text-zinc-950 md:w-auto md:px-2 py-3 text-[13px]"
            value="Confirma"
            ariaLabel="Confirmar voto"
            isAction={true}
          />
        </div>
      </div>
    </div>
  )
}
