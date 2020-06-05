import React from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
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
  Footer
} from "./style";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Detail = () => {
  const navigation = useNavigation();
  function navigateToBack() {
    navigation.goBack();
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <TouchableOpacity onPress={navigateToBack}>
          <Icon name="arrow-left" size={20} color="#34cd97" />
        </TouchableOpacity>
        <PointImage
          source={{
            uri:
              "https://images.unsplash.com/photo-1573481078935-b9605167e06b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
          }}
        />
        <PointName>mercadao bolado</PointName>
        <PointItems>Lâmpadas, etx</PointItems>
        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>Ilhabela, SP</AddressContent>
        </Address>
      </Container>
      <Footer>
        <Button onPress={() => {}}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <ButtonText>WhatsApp</ButtonText>
        </Button>
        <Button onPress={() => {}}>
          <Icon name="mail" size={20} color="#FFF" />
          <ButtonText>Email</ButtonText>
        </Button>
      </Footer>
    </SafeAreaView>
  );
};

export default Detail;
