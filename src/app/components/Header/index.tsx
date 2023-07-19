import Image from 'next/image'

export function Header() {
  return (
    <header className="bg-blue-900">
      <div className="container w-full flex items-center gap-4 mx-auto h-20 px-6">
        <Image src="/images/ciee-logo.jpg" width={64} height={64} alt="Ciee" />
        <h1 className="text-zinc-100 text-2xl font-bold">Eleições 2022</h1>
      </div>
    </header>
  )
}
