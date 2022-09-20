import axios from 'axios'
import { useEffect, useState } from 'react'
import { View, Image, FlatList } from 'react-native'

import { styles } from './styles'
import { Heading } from '../../components/Heading'
import { Game, GameCard } from '../../components/GameCard'
import logoImage from '../../assets/logo-nlw-esports.png'

export function Home() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios.get<Game[]>('http://localhost:3333/games')
      .then(({ data }) => setGames(data))
  }, [])

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
        data={games}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
        renderItem={({ item }) => (<GameCard data={item} />)}
      />
    </View>
  )
}
