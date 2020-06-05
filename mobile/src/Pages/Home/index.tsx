import React from "react";
import { Text, Image, View } from "react-native";
import {
  Container,
  Main,
  Description,
  Title,
  Footer,
  Button,
  ButtonText,
  ButtonIcon,
} from "./style";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'


const Home = () => {
  const navigation = useNavigation();

  function navigateToPoints() {
    navigation.navigate('Points')
  }

  return (
    <Container
      source={require("../../assets/home-background.png")}
      imageStyle={{ width: 274, height: 268 }}
    >
      <Main>
        <Image source={require("../../assets/logo.png")} />
        <Title>Seu marketplace de coleta de resíduos</Title>
        <Description>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiênte.
        </Description>
      </Main>

      <Footer>
        <Button onPress={navigateToPoints}>
          <ButtonIcon>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </ButtonIcon>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
};

export default Home;
