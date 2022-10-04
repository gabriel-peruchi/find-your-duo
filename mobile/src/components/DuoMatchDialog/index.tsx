import * as Clipboard from 'expo-clipboard'

import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'

import { styles } from './styles'
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';

interface DuoMatchDialogProps extends ModalProps {
  discord: string
  onClose: () => void
}

export function DuoMatchDialog({ discord, onClose, ...rest }: DuoMatchDialogProps) {
  const [isCopping, setIsCopping] = useState<boolean>(false)

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true)

    await Clipboard.setStringAsync(discord)
    Alert.alert('Discord copiado!', 'Usuário copiado para sua área de transferência.')

    setIsCopping(false)
  }

  return (
    <Modal
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.label}>
            Adicione no Discord
          </Text>

          <TouchableOpacity
            disabled={isCopping}
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
          >
            <Text style={styles.discord}>
              { 
                isCopping 
                  ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> 
                  : discord
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}