import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { RoleTitle, UrnContext, UrnState } from '@/hooks/useUrn'
import { Role } from '@/types/role'
import { Urn } from '.'
import { createRef } from 'react'

const mockedRoles = [
  {
    id: 1,
    title: 'DEPUTADO FEDERAL',
    digits: 4,
    candidates: [
      {
        number: '9101',
        name: 'Atletismo',
        party: 'PEsp',
        images: [
          {
            url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/9101_atletismo.jpg',
            caption: 'Deputado Federal',
          },
        ],
      },
      {
        number: '9102',
        name: 'Ginástica Artística',
        party: 'PEsp',
        images: [
          {
            url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/9102_ginastica.jpg',
            caption: 'Deputado Federal',
          },
        ],
      },
    ],
  },
  {
    title: 'DEPUTADO ESTADUAL',
    candidates: [],
  },
  {
    title: 'SENADOR',
    candidates: [],
  },
  {
    title: 'GOVERNADOR',
    candidates: [],
  },
  {
    title: 'PRESIDENTE',
    candidates: [],
  },
]

const mockedPlay = jest
  .spyOn(window.HTMLMediaElement.prototype, 'play')
  .mockResolvedValue()

const mockedDispatch = jest.fn()

function renderUrn(state?: Partial<UrnState>) {
  const mockedState: UrnState = {
    activeRoleTitle: 'DEPUTADO FEDERAL',
    choosenCandidate: null,
    pressedNumbers: [],
    canPressKey: true,
    isWhiteVote: false,
    votedCandidates: [],
    isEnd: false,
    ...state,
  }

  const mockedGetRoles = jest.fn()
  mockedGetRoles.mockResolvedValue(mockedRoles as unknown as Role[])

  render(
    <UrnContext.Provider
      value={{ state: mockedState, dispatch: mockedDispatch }}
    >
      <Urn roles={mockedRoles as unknown as Role[]} />
    </UrnContext.Provider>
  )
}

function mockPressKey(key: string) {
  const keyButton = screen.getByRole('button', {
    name: new RegExp(key, 'i'),
  })
  userEvent.click(keyButton)
}

describe('Urn component', () => {
  it('should display active role title', async () => {
    const activeRoleTitle: RoleTitle = 'PRESIDENTE'

    renderUrn({ activeRoleTitle })

    await waitFor(() => {
      expect(screen.getByText(activeRoleTitle)).toBeVisible()
    })
  })

  it('should display choosen candidate', async () => {
    const choosenCandidate = {
      number: '91',
      name: 'Vôlei',
      party: 'PEsp',
      alternates: ['Tênis'],
      images: [
        {
          url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/91_volei.jpg',
          caption: 'Governador',
        },
        {
          url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/951_caipora.jpg',
          caption: 'Vice-Governador',
        },
      ],
    }

    renderUrn({
      choosenCandidate,
    })

    await waitFor(() => {
      expect(screen.getByText(choosenCandidate.name)).toBeVisible()
      expect(screen.getByText(choosenCandidate.party)).toBeVisible()
      expect(screen.getByText(choosenCandidate.alternates[0])).toBeVisible()
      expect(screen.getByText(choosenCandidate.images[0].caption)).toBeVisible()
      expect(screen.getByAltText(choosenCandidate.images[0].caption))
    })
  })

  it('should display null vote when isWhiteVote state is true', async () => {
    renderUrn({ isWhiteVote: true })

    await waitFor(() => {
      expect(screen.getByLabelText(/voto nulo/i)).toHaveClass('visible')
    })
  })

  it('should dispatch pressKey action', async () => {
    renderUrn()

    mockPressKey('confirma')

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        type: 'pressKey',
        payload: expect.objectContaining({ keyValue: 'Confirma' }),
      })
    })
  })

  it('should not dispatch pressKey action when canPressKey state is false', async () => {
    mockedDispatch.mockClear()

    renderUrn({ canPressKey: false })

    mockPressKey('9')

    await waitFor(() => {
      expect(mockedDispatch).not.toHaveBeenCalledWith({
        type: 'pressKey',
        payload: expect.objectContaining({ keyValue: '9' }),
      })
    })
  })

  it('should play audio whenever a key pressed', async () => {
    mockedPlay.mockClear()

    renderUrn({ canPressKey: true })

    mockPressKey('1')
    mockPressKey('2')
    mockPressKey('3')
    mockPressKey('4')

    await waitFor(() => {
      expect(mockedPlay).toHaveBeenCalledTimes(4)
    })
  })

  it('should set choosen candidate whose number was typed on keyboard (9101)', async () => {
    mockedDispatch.mockClear()

    const activeRole = mockedRoles[0]

    renderUrn({
      activeRoleTitle: activeRole.title as RoleTitle,
      pressedNumbers: [9, 1, 0, 1],
    })

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        type: 'setChoosenCandidate',
        payload: activeRole.candidates[0],
      })
    })
  })

  it('should display null vote when a number of a candidate that does not exist', async () => {
    mockedDispatch.mockClear()

    renderUrn({
      activeRoleTitle: 'DEPUTADO FEDERAL',
      pressedNumbers: [0, 0, 0, 0],
    })

    await waitFor(() => {
      expect(screen.getByLabelText(/voto nulo/i)).toHaveClass('visible')
    })
  })

  it('should display link to results page when voting state ends', async () => {
    renderUrn({
      activeRoleTitle: 'PRESIDENTE',
      isEnd: true,
    })

    await waitFor(
      () => {
        expect(screen.getByRole('link')).toBeVisible()
      },
      { timeout: 2500 }
    )
  })
})
