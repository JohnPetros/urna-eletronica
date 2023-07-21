import { Urn } from './components/Urn'

export default function Voting() {
  return (
    <div className="flex flex-col h-[calc(100%-80px)]">
      <div>Header</div>
      <div className="h-full flex items-center justify-center">
        <Urn />
      </div>
    </div>
  )
}
