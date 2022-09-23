import { styles } from "./styles";
import { View, ActivityIndicator } from "react-native";
import { THEME } from "../../theme";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={THEME.COLORS.PRIMARY} />
    </View>
  )
}