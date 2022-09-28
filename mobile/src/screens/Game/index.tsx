import { View, Image, TouchableOpacity, FlatList, Text } from "react-native";
import { styles } from "./styles";
import {SafeAreaView} from 'react-native-safe-area-context'
import { Background } from "../../components/Background";
import { useRoute } from '@react-navigation/native';
import { GameParams } from "../../@types/navigation";
import { Entypo } from "@expo/vector-icons"
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { useNavigation } from "@react-navigation/native";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { useEffect, useState } from "react";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();


  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  },[]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
              onPress={() => {handleGoBack()}}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />
          <View style={styles.right}></View>
        </View>
        <Image
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          // resizeMode="contain"  
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar"/>
        <FlatList
          data={duos}
          horizontal
          contentContainerStyle={[duos.length === 0 ? styles.contentList : styles.emptyListContent]}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Nenhum anúncio encontrado
            </Text>
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
        />

      </SafeAreaView>
    </Background>
  )
}