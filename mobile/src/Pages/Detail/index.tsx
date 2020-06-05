import React, { useEffect, useState } from "react";
import { Linking, TouchableOpacity, SafeAreaView, Text } from "react-native";
import {
  Container,
  PointImage,
  PointName,
  PointItems,
  Address,
  AddressContent,
  AddressTitle,
  Button,
  ButtonText,
  Footer,
} from "./style";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/api";
import axios from "axios";
import * as MailComposer from "expo-mail-composer";

interface Params {
  point_id: number;
}
interface Data {
  point: {
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;
  const [data, setData] = useState<Data>({} as Data);

  

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: "Interesse na coleta de resíduos",
      recipients: [data.point.email],
    });
  }
  function handleWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`
    );
  }
  function navigateToBack() {
    navigation.goBack();
  }
  

  useEffect(() => {

    api
      .get(`points/${routeParams.point_id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => console.log("Erro ao buscar ponto especifico", e));
  });
  if (!data.point) {
    return <Text>Nada</Text>;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TouchableOpacity onPress={navigateToBack}>
          <Icon name="arrow-left" size={20} color="#34cd97" />
        </TouchableOpacity>
        <PointImage
          source={{
            uri: data.point.image,
          }}
        />
        <PointName>{data.point.name}</PointName>
        <PointItems>
          {data.items.map((item) => item.title).join(", ")}
        </PointItems>
        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>{`${data.point.city}, ${data.point.uf}`}</AddressContent>
        </Address>
      </Container>
      <Footer>
        <Button onPress={handleWhatsApp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <ButtonText>WhatsApp</ButtonText>
        </Button>
        <Button onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#FFF" />
          <ButtonText>Email</ButtonText>
        </Button>
      </Footer>
    </SafeAreaView>
  );
};

export default Detail;
