'use client'
import { useUrn } from '@/hooks/useUrn'
import { useRouter } from 'next/navigation'

import { ROLES_TITLES } from '@/constants/roles-titles'

import { Vote } from './components/Vote'

import { Variants, motion } from 'framer-motion'
import { blinkVariants } from '../voting/components/Urn/Display'
import { getStoragedUser } from '@/functions'

const linkVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 250,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: ROLES_TITLES.length * 0.6,
    },
  },
}

const mock = [
  {
    number: '951',
    name: 'Dia da indepencia do Brasil',
    party: 'PFolc',
    alternates: ['Caipora', 'Mãe do Ouro'],
    images: [
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/951_saci.jpg',
        caption: 'Senador',
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/951_caipora.jpg',
        caption: '1º Suplente',
        small: true,
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/951_mae_douro.jpg',
        caption: '2° Suplente',
        small: true,
      },
    ],
  },
  null,
  {
    number: '951',
    name: 'Saci-Pererê',
    party: 'PFolc',
    alternates: ['Caipora', 'Mãe do Ouro'],
    images: [
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/951_saci.jpg',
        caption: 'Senador',
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/951_caipora.jpg',
        caption: '1º Suplente',
        small: true,
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/951_mae_douro.jpg',
        caption: '2° Suplente',
        small: true,
      },
    ],
  },
  {
    number: '951',
    name: 'Saci-Pererê',
    party: 'PFolc',
    alternates: ['Caipora', 'Mãe do Ouro'],
    images: [
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/951_saci.jpg',
        caption: 'Senador',
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/951_caipora.jpg',
        caption: '1º Suplente',
        small: true,
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/951_mae_douro.jpg',
        caption: '2° Suplente',
        small: true,
      },
    ],
  },
  {
    number: '951',
    name: 'Saci-Pererê',
    party: 'PFolc',
    alternates: ['Caipora', 'Mãe do Ouro'],
    images: [
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/951_saci.jpg',
        caption: 'Senador',
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/951_caipora.jpg',
        caption: '1º Suplente',
        small: true,
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/951_mae_douro.jpg',
        caption: '2° Suplente',
        small: true,
      },
    ],
  },
  {
    number: '951',
    name: 'Saci-Pererê',
    party: 'PFolc',
    alternates: ['Caipora', 'Mãe do Ouro'],
    images: [
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/135x145/24bpp/951_saci.jpg',
        caption: 'Senador',
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/951_caipora.jpg',
        caption: '1º Suplente',
        small: true,
      },
      {
        url: 'https://www.tse.jus.br/hotsites/simulador-de-votacao/image/figuras/95x105/24bpp/951_mae_douro.jpg',
        caption: '2° Suplente',
        small: true,
      },
    ],
  },
]

export default function Results() {
  const { state, dispatch } = useUrn()
  const router = useRouter()
  const storagedUser = getStoragedUser()

  function handleExitClick() {
    localStorage.removeItem('urna-eletronica@user')
    router.push('/')
  }

  if (!state.votedCandidates.length || !storagedUser) {
    dispatch({ type: 'resetState' })
    router.push('/voting')
    return null
  }

  return (
    <div className="bg-blue-900 h-screen flex flex-col items-center">
      <h2 className="text-zinc-100 text-2xl mt-6">
        Seus votos, {storagedUser.name}:
      </h2>
      <dl className="flex flex-col gap-8 mt-6">
        {state.votedCandidates.map((candidate, index) => (
          <Vote
            role={ROLES_TITLES[index]}
            candidate={candidate}
            index={index}
          />
        ))}
      </dl>

      <motion.button
        variants={blinkVariants}
        animate={'blink'}
        className="mt-8 text-zinc-100 bg-transparent uppercase font-semibold text-3xl tracking-wide"
        onClick={handleExitClick}
      >
        <motion.span variants={linkVariants} initial="hidden" animate="visible">
          Sair
        </motion.span>
      </motion.button>
    </div>
  )
}
