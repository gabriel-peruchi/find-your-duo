import { LinearGradient } from 'expo-linear-gradient'
import {
  Text,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
  TouchableOpacityProps
} from 'react-native'
import { THEME } from '../../theme'

import { styles } from './styles'

export interface GameProps {
  id: string
  ads: number
  name: string
  cover: ImageSourcePropType
}

interface GameCardProps extends TouchableOpacityProps {
  data: GameProps
}

export function GameCard({ data, ...rest }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.cover}
        source={data.cover}
      >
        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.name}
          </Text>
          <Text style={styles.ads}>
            {data.ads} anúncios
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
