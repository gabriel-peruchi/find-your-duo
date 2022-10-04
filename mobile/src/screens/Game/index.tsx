import axios from 'axios'
import { useState, useEffect } from 'react'
import { Entypo } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native'

import { styles } from './styles'
import { THEME } from '../../theme'
import { Heading } from '../../components/Heading'
import { Ad, DuoCard } from '../../components/DuoCard'
import { Background } from '../../components/Background'
import logoImage from '../../assets/logo-nlw-esports.png'
import { Game as GameProps } from '../../components/GameCard'
import { DuoMatchDialog } from '../../components/DuoMatchDialog'

export function Game() {
  const [ads, setAds] = useState<Ad[]>([])
  const [discordSelected, setDiscordSelected] = useState<string | null>(null)

  const route = useRoute()
  const navigation = useNavigation()
  const game = route.params as GameProps

  useEffect(() => {
    axios
      .get<Ad[]>(`http://localhost:3333/games/${game.id}/ads`)
      .then(({ data }) => setAds(data))
  }, [])

  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUser(adId: string) {
    const response = await axios.get(`http://localhost:3333/ads/${adId}/discord`)
    const { discord } = response.data

    setDiscordSelected(discord)
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImage}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.banner}
          resizeMode="cover"
        />

        <Heading 
          title={game.name} 
          subtitle="Conecte-se e comece a jogar!" 
        />

        <FlatList
          data={ads}
          horizontal
          style={styles.containerList}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={ads.length ? styles.contentList : styles.emptyListContent}
          renderItem={({ item }) => (
            <DuoCard 
              data={item}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />

        <DuoMatchDialog
          visible={!!discordSelected}
          discord={discordSelected as string}
          onClose={() => setDiscordSelected(null)}
        />
      </SafeAreaView>
    </Background>
  )
}