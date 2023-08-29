import { Header } from './components/Header'
import { Form } from './components/Form'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex h-[calc(100%-5rem)] items-center justify-center">
        <Form />
      </main>
    </>
  )
}
