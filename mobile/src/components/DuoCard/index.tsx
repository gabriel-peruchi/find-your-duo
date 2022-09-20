import { TouchableOpacity, View, Text } from 'react-native'
import { GameController } from 'phosphor-react-native'

import { styles } from './styles'
import { DuoInfo } from '../DuoInfo'
import { THEME } from '../../theme'

export interface Ad {
  id: string
  name: string
  hourEnd: string
  hourStart: string
  weekDays: string[]
  yearsPlaying: number
  useVoiceChannel: boolean
}

interface DuoCardProps {
  data: Ad
  onConnect: () => void
}
 
export function DuoCard({ data, onConnect }: DuoCardProps) {
  return (
    <View style={styles.container}>
      <DuoInfo 
        label="Nome" 
        value={data.name} 
      />

      <DuoInfo 
        label="Tempo de jogo" 
        value={`${data.yearsPlaying} ano(s)`} 
      />

      <DuoInfo 
        label="Disponibilidade" 
        value={`${data.weekDays.length} dias • ${data.hourStart}h - ${data.hourEnd}h`} 
      />

      <DuoInfo 
        label="Chamada de áudio?" 
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT} 
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />

        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  )
}