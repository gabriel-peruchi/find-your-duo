import { View, Image, FlatList } from 'react-native'

import { styles } from './styles'
import { GAMES } from '../../utils/games'
import { Heading } from '../../components/Heading'
import { GameCard } from '../../components/GameCard'
import logoImage from '../../assets/logo-nlw-esports.png'


export function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={logoImage}
        style={styles.logo}
      />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        horizontal
        data={GAMES}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
        renderItem={({ item }) => (<GameCard data={item} />)}
      />
    </View>
  )
}
