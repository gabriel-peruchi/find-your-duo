import axios from 'axios'
import * as AuthSession from 'expo-auth-session'

import { Image, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GameController } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

import { styles } from './styles'
import { THEME } from '../../theme'
import { Heading } from '../../components/Heading'
import logoImage from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background'

export function SignIn() {
  const navigation = useNavigation()

  async function handleDiscordSignIn() { 
    const response = await AuthSession.startAsync({
      authUrl: 'https://discord.com/api/oauth2/authorize?client_id=1028333346981429299&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40gabriel-peruchi%2Fmobile&response_type=token&scope=identify'
    })

    const { data: user } = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        'authorization': `Bearer ${response.params.access_token}`
      }
    })

    // TODO: handle user data

    navigation.navigate('home')
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImage}
          style={styles.logo}
        />

        <Heading
          title="Entrar"
          subtitle="Encontre seu duo e bora jogar."
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleDiscordSignIn}
        >
          <GameController
            color={THEME.COLORS.TEXT}
            size={20}
          />

          <Text style={styles.buttonTitle}>
            Entrar com Discord
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Background>
  )
}
