import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController, CaretDown, CaretUp } from 'phosphor-react';
import { Input } from './Form/Input';
import { FormEvent, useEffect, useState } from 'react';
import { Game } from '../App';
import axios from 'axios';

export function CreateAdModal() {

  const [games, setGames] = useState<Game[]>();
  const [weekDays, setWeekDays] = useState<string[]>([]);  
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  // useEffect(() => {
  //   fetch('http://localhost:3333/games')
  //     .then(response => response.json())
  //     .then(data => {
  //       setGames(data);
  //     });
  // }, []);

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`,{
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      })
      alert('Anúncio criado com sucesso!');
    } catch (error) {
      console.log(error);
      alert('Erro ao criar anúncio!');
    }
  }
   
  return (
    <Dialog.Portal>
          <Dialog.Overlay className="bg-black/80 inset-0 fixed"/>
          <Dialog.Content 
            className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 
                       left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]
                       shadow-lg shadow-black/25"
          >
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
            
            <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <Select.Root name='game'>
                  <Select.Trigger aria-label='games' className="text-zinc-500 text-sm flex rounded justify-between bg-zinc-900 py-3 px-4 items-center" >
                    <Select.Value placeholder="Selecione o game que deseja jogar"/>
                    <Select.Icon>
                      <CaretDown className="w-6 h-6 text-zinc-400"/>
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-zinc-900 py-1 px-1 mt-10 rounded w-[400px]">

                      <Select.ScrollUpButton
                        className="flex items-center justify-center h-[25px] bg-zinc-900 hover:bg-zinc-800 cursor-default rounded"
                      >
                        <CaretUp size={16} className="text-violet-500" />
                      </Select.ScrollUpButton>

                      <Select.Viewport>
                        {games && games.map(game =>
                        (
                          <Select.Item
                            key={game.id}
                            value={game.id}
                            className="text-white text-sm py-2 px-3 hover:bg-zinc-800"
                          >
                            <Select.ItemText className="text-white">
                              {game.title}
                            </Select.ItemText>
                            <Select.ItemIndicator
                              className="absolute w-[25px] items-center justify-center right-2"
                            >
                              <Check size={18} className="text-emerald-500" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>

                      <Select.ScrollDownButton
                        className="flex items-center justify-center h-[25px] bg-emerald-800 cursor-default"
                      >
                        <CaretDown size={16} />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input name="name" id="name" type="text" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos</label>
                  <Input name="yearsPlaying" type="number" id="yearsPlaying" placeholder="Tudo bem ser ZERO" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input name="discord" type="text" id="discord" placeholder="Usuario#000" />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <ToggleGroup.Root 
                    type="multiple" 
                    className="grid grid-cols-4 gap-2"
                    value={weekDays}
                    onValueChange={setWeekDays}
                  >
                    <ToggleGroup.Item 
                      value="0" 
                      title="Domingo" 
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                    >
                      D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="1"
                      title="Segunda"
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="2"
                      title="Terça"
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                    >
                      T
                    </ToggleGroup.Item> 
                    <ToggleGroup.Item 
                      value="3" 
                      title="Quarta" 
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                    >
                      Q
                    </ToggleGroup.Item> 
                    <ToggleGroup.Item
                      value="4"
                      title="Quinta"
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                    >
                      Q
                    </ToggleGroup.Item> 
                    <ToggleGroup.Item
                      value="5"
                      title="Sexta" 
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                    >
                      S  
                    </ToggleGroup.Item> 
                    <ToggleGroup.Item
                      value="6"
                      title="Sábado"
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ? 'bg-violet-500' : '' }`}
                    >
                      S
                    </ToggleGroup.Item> 
                  </ToggleGroup.Root>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                    <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 mt-2 text-sm">
                <Checkbox.Root 
                  onCheckedChange={(checked) => {
                    if(checked === true) {
                      setUseVoiceChannel(true)
                    } else {
                      setUseVoiceChannel(false)
                    }
                    }} 
                  className="w-6 h-6 p-1 rounded bg-zinc-900">
                  <Checkbox.Indicator>
                    <Check className="h-4 w-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>

              <footer className="mt-4 flex justify-end gap-4 ">
                <Dialog.Close 
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold 
                            hover:bg-zinc-600"
                  >
                    Cancelar
                  </Dialog.Close>
                <button  
                  type="submit" 
                  className="bg-violet-500 px-5 h-12 gap-3 rounded-md 
                             font-semibold flex items-center hover:bg-violet-600"
                  >
                  <GameController size={24}/>
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
  );
}