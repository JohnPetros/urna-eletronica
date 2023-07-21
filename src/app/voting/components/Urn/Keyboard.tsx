import Image from 'next/image'
import { Key } from './Key'

const keys = new Array(9).fill('').map((_, index) => index + 1)

export function Keyboard() {
  console.log(keys)

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
      <div className="grid grid-cols-3 gap-2 bg-zinc-600 p-6">
        {keys.map((key) => (
          <div key={key} className="grid place-content-center">
            <Key className="bg-zinc-800 px-9 py-2" value={String(key)} />
          </div>
        ))}
        <div className="col-span-3 grid place-content-center">
          <Key className="bg-zinc-800 px-9 py-2" value="0" />
        </div>

        <div className='col-span-3 flex items-center justify-between mt-3'>
          <Key className="bg-zinc-100 text-zinc-800 px-3 py-2" value="Branco" />
          <Key
            className="bg-orange-600 text-zinc-950 px-3 py-2"
            value="Corrige"
          />
          <Key
            className="bg-green-600 text-sm text-zinc-950 px-3 py-3"
            value="Confirma"
          />
        </div>
      </div>
    </div>
  )
}
