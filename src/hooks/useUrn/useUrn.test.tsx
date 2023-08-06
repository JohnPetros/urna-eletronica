import { renderHook } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { UrnAction, UrnContext, UrnState, urnReducer, useUrn } from '.'
import { useModal } from '../useModal'
import { ROLES_TITLES } from '@/constants/roles-titles'

jest.mock('../useModal')

const mockedCandidates = [
  {
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
        small: true,
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
        small: true,
      },
    ],
  },
  {
    number: '93',
    name: 'Médica',
    party: 'PProf',
    alternates: ['Bibliotecária'],
    images: [
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/93_medica.jpg',
        caption: 'Governadora',
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/93_bibliotecaria.jpg',
        caption: 'Vice-Governadora',
        small: true,
      },
    ],
  },
]

function mockUseModal() {
  const mockedUseModal = mocked(useModal)

  const mockedOpenModal = jest.fn()

  mockedUseModal.mockReturnValue({
    openModal: mockedOpenModal,
  })

  return { mockedOpenModal }
}

function mockDispatch(action: UrnAction, initialState?: Partial<UrnState>) {
  const mockedUrnState: Partial<UrnState> = {
    ...initialState,
  }

  return urnReducer(mockedUrnState as UrnState, action as UrnAction)
}

function mockPressKey(key: string, initialState: Partial<UrnState>): UrnState {
  const mockedUrnState: Partial<UrnState> = {
    ...initialState,
  }

  const mockedAction: UrnAction = {
    type: 'pressKey',
    payload: key,
  }

  return mockDispatch(mockedAction, mockedUrnState)
}

describe('useUrn hook', () => {
  it('should add numeric string to pressedNumbers state', () => {
    mockUseModal()

    const pressedKey = '4'

    const updatedState = mockPressKey(pressedKey, { pressedNumbers: [] })

    expect(updatedState).toEqual({
      pressedNumbers: [Number(pressedKey)],
    })
  })

  it('should not add alpha string to pressedNumbers state', () => {
    mockUseModal()

    const pressedKey = 'abc'

    const updatedState = mockPressKey(pressedKey, { pressedNumbers: [] })

    expect(updatedState).not.toEqual({
      pressedNumbers: [pressedKey],
    })
  })

  it('should only set isWhiteVote to true and canPressKey to false when white vote key is pressed, pressedNumbers is empty and choosenCandidate is null', () => {
    mockUseModal()

    const updatedState = mockPressKey('branco', {
      pressedNumbers: [],
      choosenCandidate: null,
      canPressKey: true,
      isWhiteVote: false,
    })

    expect(updatedState).not.toEqual({
      isWhiteVote: true,
      canPressKey: false,
    })
  })

  it('should open modal when white vote is pressed, pressedNumbers is not empty', () => {
    const { mockedOpenModal } = mockUseModal()

    mockPressKey('branco', {
      pressedNumbers: [1, 2, 3, 4],
      choosenCandidate: null,
    })

    expect(mockedOpenModal).toHaveBeenCalledWith({
      type: 'error',
      title: 'Para votar em BRANCO, o campo de voto deve estar vazio.',
      text: 'Aperte CORRIGE para apagar o campo de voto.',
    })
  })

  it('should remove last pressed number when "corrige" key is pressed and canPressKey is true', () => {
    mockUseModal()

    const updatedState = mockPressKey('corrige', {
      canPressKey: true,
      pressedNumbers: [1, 2, 3],
    })

    expect(updatedState).toEqual({
      canPressKey: true,
      isWhiteVote: false,
      pressedNumbers: [1, 2],
    })
  })

  it('should remove all numbers when "corrige" key is pressed and canPressKey is false', () => {
    mockUseModal()

    const updatedState = mockPressKey('corrige', {
      canPressKey: false,
      pressedNumbers: [1, 2, 3],
    })

    expect(updatedState).toEqual({
      canPressKey: true,
      isWhiteVote: false,
      choosenCandidate: null,
      pressedNumbers: [],
    })
  })

  it('should call openModal when "confirma" key is pressed and canPressKey is true', () => {
    const { mockedOpenModal } = mockUseModal()

    mockPressKey('confirma', {
      pressedNumbers: [1],
      canPressKey: true,
    })

    expect(mockedOpenModal).toHaveBeenCalledWith({
      type: 'error',
      title: 'Para votar, o campo de voto deve estar completo.',
      text: 'Insira o dígitos pressionando as teclas numéricas.',
    })
  })

  it('should add voted candidate and switch to the next role title when "confirma" key is pressed and has a choosen candidate and canPressKey is false', () => {
    mockUseModal()

    const updatedState = mockPressKey('confirma', {
      activeRoleTitle: ROLES_TITLES[1],
      canPressKey: false,
      choosenCandidate: mockedCandidates[1],
      votedCandidates: [mockedCandidates[0]],
    })

    expect(updatedState).toEqual({
      activeRoleTitle: ROLES_TITLES[2],
      canPressKey: true,
      isWhiteVote: false,
      pressedNumbers: [],
      choosenCandidate: null,
      votedCandidates: [mockedCandidates[0], mockedCandidates[1]],
    })
  })

  it('should set urn voting state to end when there are no more next roles titles', () => {
    mockUseModal()

    const updatedState = mockPressKey('confirma', {
      activeRoleTitle: ROLES_TITLES.at(-1),
      canPressKey: false,
      choosenCandidate: mockedCandidates[2],
      votedCandidates: [mockedCandidates[0], mockedCandidates[1]],
    })

    expect(updatedState).toEqual({
      isEnd: true,
      activeRoleTitle: ROLES_TITLES.at(-1),
      canPressKey: false,
      isWhiteVote: false,
      pressedNumbers: [],
      choosenCandidate: null,
      votedCandidates: [
        mockedCandidates[0],
        mockedCandidates[1],
        mockedCandidates[2],
      ],
    })
  })

  it('should set choosen candidate', () => {
    mockUseModal()

    const updatedState = mockDispatch({
      type: 'setChoosenCandidate',
      payload: mockedCandidates[0],
    })

    expect(updatedState).toEqual({
      choosenCandidate: mockedCandidates[0],
    })
  })

  it('should reset urn state', () => {
    mockUseModal()

    const updatedState = mockDispatch(
      {
        type: 'resetState',
      },
      {
        canPressKey: false,
        isEnd: true,
        isWhiteVote: true,
        pressedNumbers: [1, 2, 3],
        choosenCandidate: mockedCandidates[1],
        votedCandidates: mockedCandidates,
        activeRoleTitle: ROLES_TITLES.at(-1),
      }
    )

    expect(updatedState).toEqual({
      activeRoleTitle: ROLES_TITLES[0],
      choosenCandidate: null,
      pressedNumbers: [],
      canPressKey: true,
      isWhiteVote: false,
      votedCandidates: [],
      isEnd: false,
    })
  })
})
