import './styles/main.css'

import axios from 'axios'
import { useState, useEffect } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { Game } from './types/Game'
import { GameCard } from './components/GameCard'
import logoImg from './assets/logo-nlw-esports.svg'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdDialog } from './components/CreateAdDialog'

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios.get('http://localhost:3333/games')
      .then(({ data }) => setGames(data))
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {
          games.map(game => (
            <GameCard
              key={game.id}
              title={game.name}
              imageUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          ))
        }
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdDialog />
      </Dialog.Root>
    </div>
  )
}

export default App
