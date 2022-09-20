import { StatusBar } from 'react-native'
import {
  useFonts,
  Inter_700Bold,
  Inter_900Black,
  Inter_400Regular,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter'

import { Routes } from './src/routes'
import { Loading } from './src/components/Loading'
import { Background } from './src/components/Background'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_900Black,
    Inter_400Regular,
    Inter_600SemiBold,
  })

  return (
    <Background>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      {
        fontsLoaded 
          ? <Routes />
          : <Loading />
      }
    </Background>
  )
}
