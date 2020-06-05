import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import {
  Container,
  Title,
  Description,
  MapContainer,
  Map,
  Item,
  ItemTitle,
  MapMarker,
  ItemsContainer,
  MapMarkerImage,
  MapMarkerContainer,
  MapMarkerTitle,
} from "./style";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import api from "../../services/api";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const navigation = useNavigation();
  function navigateToBack() {
    navigation.goBack();
  }
  function navigateToDetail() {
    navigation.navigate("Detail");
  }
  function handleSelectItem(id: number){
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      let filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  useEffect(() => {
    api
      .get("items")
      .then((response) => {
        if (response.data.success) {
          setItems(response.data.items);
        }
      })
      .catch((e) => {
        alert("erro ao buscar itens");
      });
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TouchableOpacity onPress={navigateToBack}>
          <Icon name="arrow-left" size={20} color="#34cd97" />
        </TouchableOpacity>
        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta.</Description>

        <MapContainer>
          <Map
            initialRegion={{
              latitude: -23.8069824,
              longitude: -45.3651364,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            <MapMarker
              coordinate={{ latitude: -23.8069824, longitude: -45.3651364 }}
              onPress={navigateToDetail}
            >
              <MapMarkerContainer>
                <MapMarkerImage
                  source={{
                    uri:
                      "https://images.unsplash.com/photo-1573481078935-b9605167e06b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
                  }}
                />
                <MapMarkerTitle>Mercado</MapMarkerTitle>
              </MapMarkerContainer>
            </MapMarker>
          </Map>
        </MapContainer>
      </Container>

      <ItemsContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items &&
            items.map((item) => (
              <Item
                activeOpacity={0.6}
                key={String(item.id)}
                onPress={() => handleSelectItem(item.id)}
                selected={selectedItems.includes(item.id) ? 'selected' : ''}
              >
                <SvgUri width={42} height={42} uri={item.image_url} />
                <ItemTitle>{item.title}</ItemTitle>
              </Item>
            ))}
        </ScrollView>
      </ItemsContainer>
    </SafeAreaView>
  );
};

export default Points;
