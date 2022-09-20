import axios from 'axios'
import { useEffect, useState } from 'react'
import { Image, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { styles } from './styles'
import { Heading } from '../../components/Heading'
import { Game, GameCard } from '../../components/GameCard'
import logoImage from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background'

export function Home() {
  const [games, setGames] = useState<Game[]>([])

  const navigation = useNavigation()

  useEffect(() => {
    axios.get<Game[]>('http://localhost:3333/games')
      .then(({ data }) => setGames(data))
  }, [])

  function handleOpenGame(gameSelected: Game) {
    navigation.navigate('game', gameSelected)
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
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
          renderItem={({ item }) => (
            <GameCard 
              data={item} 
              onPress={() => handleOpenGame(item)} 
            />
          )}
        />
      </SafeAreaView>
    </Background>
  )
}
