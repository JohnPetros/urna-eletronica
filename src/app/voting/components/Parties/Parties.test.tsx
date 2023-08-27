import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { UrnContext, UrnState } from '@/hooks/useUrn'
import { Parties } from '.'
import { Role } from '@/types/role'
import { PARTIES } from '@/constants/parties'

const mockedRoles = [
  {
    title: 'DEPUTADO FEDERAL',
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

const mockedState: UrnState = {
  activeRoleTitle: 'DEPUTADO FEDERAL',
  choosenCandidate: null,
  pressedNumbers: [],
  canPressKey: true,
  isWhiteVote: false,
  votedCandidates: [],
  isEnd: false,
}

const mockedDispatch = () => {}

function renderParties() {
  const mockedGetRoles = jest.fn()
  mockedGetRoles.mockResolvedValue(mockedRoles as unknown as Role[])

  render(
    <UrnContext.Provider
      value={{ state: mockedState, dispatch: mockedDispatch }}
    >
      <Parties roles={mockedRoles as unknown as Role[]} />
    </UrnContext.Provider>
  )
}

describe('Party component', () => {
  it.each(PARTIES)(
    'should display $title party as a tab button',
    async ({ title, abbr }) => {
      renderParties()

      await waitFor(() => {
        expect(screen.getByText(title)).toBeVisible()
        expect(screen.getByText(abbr)).toBeVisible()
      })
    }
  )

  it('should display candidates of active party', async () => {
    renderParties()

    const tabTrigger = screen.getByTestId('tab-PEsp')

    userEvent.click(tabTrigger)

    await waitFor(() => {
      expect(screen.getByText('Atletismo')).toBeVisible()
      expect(screen.getByText('9101')).toBeVisible()
    })
  })

  it('should not display candidates when close tab button is clicked', async () => {
    renderParties()

    const tabTrigger = screen.getByTestId('tab-PEsp')
    await userEvent.click(tabTrigger)

    const tabCloseButton = screen.getAllByRole('button', {
      name: 'Parar de ver os candidatos desse partido',
    })[0]

    await userEvent.click(tabCloseButton)

    await waitFor(() => {
      expect(screen.queryByText('Atletismo')).not.toBeInTheDocument()
      expect(screen.queryByText('9101')).not.toBeInTheDocument()
    })
  })
})
