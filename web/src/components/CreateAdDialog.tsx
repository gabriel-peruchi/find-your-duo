import axios from 'axios'
import { useEffect, useState, FormEvent } from 'react'
import { Check, GameController } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Input } from './Form/Input'
import { Game } from '../types/Game'

const weekDayOptions = [
  { label: 'Domingo', value: '0' },
  { label: 'Segunda', value: '1' },
  { label: 'Terça', value: '2' },
  { label: 'Quarta', value: '3' },
  { label: 'Quinta', value: '4' },
  { label: 'Sexta', value: '5' },
  { label: 'Sábado', value: '6' },
]

export function CreateAdDialog() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

  useEffect(() => {
    axios.get('http://localhost:3333/games')
      .then(({ data }) => setGames(data))
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    const gameId = data.game

    // TODO: validation

    try {
      await axios.post(`http://localhost:3333/games/${gameId}/ads`, {
        name: data.name,
        useVoiceChannel,
        discord: data.discord,
        hourEnd: data.hourEnd,
        hourStart: data.hourStart,
        weekDays: weekDays.map(Number),
        yearsPlaying: Number(data.yearsPlaying),
      })

      alert('Anúncio criado com sucesso!')
    } catch (error) {
      console.log(error)
      alert('Falha ao tentar criar o anúncio!')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            <select 
              id="game"
              name="game"
              defaultValue=""
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
            >
              <option disabled value="">Selecione o game que deseja jogar</option>
              { 
                games.map(game => {
                  return <option key={game.id} value={game.id}>{game.name}</option>
                })
              }
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
            <Input id="name" name="name" placeholder="Como te chamam dentro do game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
              <Input type="number" id="yearsPlaying" name="yearsPlaying" placeholder="Tudo bem ser ZERO" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord" className="font-semibold">Qual o seu Discord?</label>
              <Input id="discord" name="discord" placeholder="Usuário#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>

              <ToggleGroup.Root 
                type="multiple" 
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                {
                  weekDayOptions.map((weekDay, index) => {
                    return (
                      <ToggleGroup.Item
                        key={index}
                        title={weekDay.label}
                        value={weekDay.value}
                        className={`w-8 h-8 rounded ${weekDays.includes(weekDay.value) ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        {weekDay.label[0]}
                      </ToggleGroup.Item>
                    )
                  })
                }
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart" className="font-semibold">Qual o horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input id="hourStart" name="hourStart" type="time" placeholder="De" />
                <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" />
              </div>
            </div>
          </div>

          <label className="mt-2 items-center flex gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              onCheckedChange={(checked) => setUseVoiceChannel(checked === true)}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400"/>
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close 
              type="button" 
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors"
            >
              Cancelar
            </Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition-colors"
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}