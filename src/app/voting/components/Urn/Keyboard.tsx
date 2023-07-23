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
      <div className="grid grid-cols-3 items-center gap-2 bg-zinc-600 p-6">
        {keys.map((key) => (
          <div key={key} className="flex md:flex items-center justify-center">
            <Key
              className="bg-zinc-800 w-full md:px-9 py-2"
              value={String(key)}
            />
          </div>
        ))}
        <div className="col-span-3 flex md:flex items-center justify-center">
          <Key className="bg-zinc-800 px-16 md:px-9 py-2" value="0" />
        </div>

        <div className="col-span-3 flex items-center justify-between mt-3">
          <Key
            className="bg-zinc-100 text-zinc-800 w-[30%] md:w-auto md:px-2 py-2 text-sm"
            value="Branco"
            isAction={true}
          />
          <Key
            className="bg-orange-600 text-zinc-950 w-[30%] md:w-auto md:px-2 py-2 text-sm"
            value="Corrige"
            isAction={true}
          />
          <Key
            className="bg-green-600 text-zinc-950 w-[30%] md:w-auto md:px-2 py-3 text-sm"
            value="Confirma"
            isAction={true}
          />
        </div>
      </div>
    </div>
  )
}
