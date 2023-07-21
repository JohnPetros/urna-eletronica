import Image from 'next/image'
import { Key } from './Key'

const keys = new Array(9).fill('').map((_, index) => index + 1)

export function Keyboard() {
  console.log(keys)

  return (
    <div>
      <header className="bg-zinc-200 flex items-center justify-between p-2">
        <Image
          src="/images/republica-logo.png"
          width={48}
          height={48}
          alt="Justiça eleitoral"
        />
        <h2 className="uppercase text-lg text-zinc-900 font-bold">
          Justiça eleitoral
        </h2>
      </header>
      <div className="grid grid-cols-3 gap-3 bg-zinc-600 p-6">
        {keys.map((key) => (
          <div key={key} className="grid place-content-center">
            <Key className="bg-zinc-800" value={String(key)} />
          </div>
        ))}
        <div className="col-span-3 grid place-content-center">
          <Key className="bg-zinc-800" value="0" />
        </div>

        <Key className="bg-zinc-100" value="Branco" />
        <Key className="bg-orange-500" value="Corrige" />
        <Key className="bg-green-400" value="Confirma" />
      </div>
    </div>
  )
}
