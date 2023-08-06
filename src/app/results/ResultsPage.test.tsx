import { UrnContext, UrnState } from '@/hooks/useUrn'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Results from './page'
import { UserContext } from '@/hooks/useUser'
import { Candidate } from '@/types/candidate'
import { ROLES_TITLES } from '@/constants/roles-titles'

type VotedCandidates = (Candidate | null)[]

const mockedVotedCandidates = [
  {
    number: '9302',
    name: 'Operário',
    party: 'PProf',
    images: [
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/9302_operario.jpg',
        caption: 'Deputado Federal',
      },
    ],
  },
  {
    number: '94002',
    name: 'Réveillon',
    party: 'PFest',
    images: [
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/94002_reveillon.jpg',
        caption: 'Deputado Estadual',
      },
    ],
  },
  {
    number: '921',
    name: 'Samba',
    party: 'PMus',
    alternates: ['Tango', 'Música Disco'],
    images: [
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/921_samba.jpg',
        caption: 'Senador',
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/921_tango.jpg',
        caption: '1º Suplente',
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/921_musica_disco.jpg',
        caption: '2° Suplente',
      },
    ],
  },
  {
    number: '92',
    name: 'Forró',
    party: 'PMus',
    alternates: ['Pagode'],
    images: [
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/92_forro.jpg',
        caption: 'Governador',
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/92_pagode.jpg',
        caption: 'Vice-Governador',
      },
    ],
  },
  {
    number: '92',
    name: 'Rock',
    party: 'PMus',
    alternates: ['Música Popular Brasileira'],
    images: [
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/92_rock.jpg',
        caption: 'Presidente',
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/92_musica_popular_brasileira.jpg',
        caption: 'Vice-Presidente',
      },
    ],
  },
]

function regex(text: string) {
  return new RegExp(text, 'i')
}

const mockedPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter() {
    return { push: mockedPush }
  },
}))

const mockedUser = {
  name: 'John Petros',
}

const mockedRegisterUser = jest.fn()
const mockedRemoveUser = jest.fn()
const mockedDispatch = jest.fn()

function renderResultsPage(votedCandidates: VotedCandidates) {
  render(
    <UserContext.Provider
      value={{
        user: mockedUser,
        hasUser: true,
        registerUser: mockedRegisterUser,
        removeUser: mockedRemoveUser,
      }}
    >
      <UrnContext.Provider
        value={{
          state: { votedCandidates } as UrnState,
          dispatch: mockedDispatch,
        }}
      >
        <Results />
      </UrnContext.Provider>
    </UserContext.Provider>
  )
}

describe('Results page', () => {
  it('should display user name', async () => {
    renderResultsPage(mockedVotedCandidates)

    screen.debug()

    await waitFor(() => {
      expect(screen.getByText(`Seus votos, ${mockedUser.name}:`)).toBeVisible()
    })
  })

  it.each(ROLES_TITLES)('should display each role title', async (roleTitle) => {
    renderResultsPage(mockedVotedCandidates)

    screen.debug()

    await waitFor(() => {
      expect(screen.getByText(regex(roleTitle))).toBeVisible()
    })
  })

  it.each(mockedVotedCandidates)(
    'should display candidate $name data on the page',
    async ({ name, alternates, number, party }) => {
      renderResultsPage(mockedVotedCandidates)

      await waitFor(() => {
        expect(screen.getByText(regex(name))).toBeInTheDocument()
        expect(screen.getByAltText(regex(name))).toBeInTheDocument()

        const partyMatches = screen.getAllByText(regex(party))
        expect(partyMatches.length).toBeGreaterThan(0)

        const numberMatches = screen.getAllByText(regex(number))
        expect(numberMatches.length).toBeGreaterThan(0)

        if (alternates) {
          for (const alternate of alternates) {
            expect(screen.queryByAltText(alternate)).toBeInTheDocument()
          }
        }
      })
    }
  )

  it('should display "VOTO EM BRANCO" when voted candidate is null', async () => {
    const mockedVotedCandidatesWithNull = mockedVotedCandidates.map(
      (candidate, index) => (index === 0 ? null : candidate)
    )

    renderResultsPage(mockedVotedCandidatesWithNull)

    await waitFor(() => {
      expect(screen.getByText(regex('voto em branco'))).toBeInTheDocument()
    })
  })

  it('should reset application state on exit', async () => {
    renderResultsPage(mockedVotedCandidates)

    const link = await screen.findByRole('button')
    userEvent.click(link)

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        type: 'resetState',
      })
    })

    await waitFor(() => {
      expect(mockedRemoveUser).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(mockedPush).toHaveBeenCalledWith('/')
    })
  })
})
