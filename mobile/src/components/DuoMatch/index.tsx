import { styles } from "./styles";
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { THEME } from "../../theme";
import { CheckCircle } from 'phosphor-react-native'
import { Heading } from "../Heading";
import * as ClipBoard from 'expo-clipboard';
import { useState } from "react";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    await ClipBoard.setStringAsync(discord);
    Alert.alert('Discord Copiado!', 'Usuário copiado para você, agora é só entrar em contato com ele!');
    setIsCopping(false);
  }

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose} >
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle
            color={THEME.COLORS.SUCCESS}
            size={64}
            weight="bold"
          />

          <Heading
            title="Let's Play"
            subtitle="Agora é só começar a jogar"
            style={{alignItems: 'center', marginTop: 24}}
          />

          <Text style={styles.label}>
            Adicione no Discord
          </Text>

         <TouchableOpacity 
          style={styles.discordButton} 
          onPress={handleCopyDiscordToClipboard}
          disabled={isCopping}
        >
          <Text style={styles.discord}>
            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
          </Text>

         </TouchableOpacity>
        </View>
      </View> 
    </Modal>
  )
}