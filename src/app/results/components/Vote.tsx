import { RoleTitle } from '@/hooks/useUrn'
import type { Candidate } from '@/types/candidate'
import Image from 'next/image'

interface VoteProps {
  role: RoleTitle
  candidate: Candidate | null
}

export function Vote({ role, candidate }: VoteProps) {
  return (
    <div className="flex items-center justify-between gap-12 text-zinc-100">
      <dt className="uppercase">{role}:</dt>

      {candidate ? (
        <dd className="flex items-center w-96 gap-2 mt-6 relative">
          <Image
            src={candidate.images[0].url}
            width={64}
            height={64}
            alt={candidate.name}
          />
          <dl>
            <div className="flex items-center gap-2 w-48">
              <dt>Nome:</dt>
              <dl>{candidate.name}</dl>
            </div>
            <div className="flex items-center gap-2 w-48">
              <dt>Partido:</dt>
              <dl>{candidate.party}</dl>
            </div>
            <div className="flex items-center gap-2 w-48">
              <dt>Número:</dt>
              <dl>{candidate.number}</dl>
            </div>
          </dl>
          {candidate.alternates && (
            <ul className="flex gap-2">
              {candidate.alternates.map((alternate, index) => (
                <li>
                  <Image
                    src={candidate.images[index + 1].url}
                    width={40}
                    height={40}
                    alt={alternate}
                  />
                  {/* <small>{alternate}</small>
                  <small>{candidate.images[index + 1].caption}</small> */}
                </li>
              ))}
            </ul>
          )}
        </dd>
      ) : (
        <p className="uppercase self-start">Voto em branco</p>
      )}
    </div>
  )
}
