import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import * as Location from "expo-location";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import api from "../../services/api";

interface Item {
  id: number;
  title: string;
  image_url: string;
}
interface Point {
  id: number;
  image: string;
  image_url: string;
  name: string;
  latitude: number;
  longitude: number;
}
interface RouteParams {
  uf: string;
  city: string;
}
const Points = () => {
  const routes = useRoute()
  const routeParams = routes.params as RouteParams;

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const navigation = useNavigation();
  function navigateToBack() {
    navigation.goBack();
  }
  function navigateToDetail(id: number) {
    navigation.navigate("Detail", { point_id: id });
  }
  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      let filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }
  async function loadPosition() {
    const { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Opss 😮",
        "Precisamos de sua permissão para obter sua localização."
      );
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    setInitialPosition([latitude, longitude]);
  }
  function loadPoints() {
    let config = {
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItems,
      },
    };
    api
      .get("points", config)
      .then((response) => {
        if (response.data.success) {
          setPoints(response.data.points);
          console.log('points',response.data.points)
        } else {
          throw "Não foi possivel localizar os pontos de coleta";
        }
      })
      .catch((e) =>
        Alert.alert(
          'Aah "/',
          "Não possuimos nenhum ponto de coleta cadastrado..."
        )
      );
  }
  useEffect(() => {
    loadPoints();
  }, [selectedItems]);
  useEffect(() => {
    loadPosition();
  }, []);
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

        {initialPosition[0] !== 0 && (
          <MapContainer>
            <Map
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points && points.map((point) => (
               
                <MapMarker
                  key={String(point.id)}
                  coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                  onPress={() => navigateToDetail(point.id)}
                >
                  <MapMarkerContainer>
                    <MapMarkerImage
                      source={{
                        uri:
                          `${point.image_url}`,
                      }}
                    />
                    <MapMarkerTitle>{point.name}</MapMarkerTitle>
                  </MapMarkerContainer>
                </MapMarker>
              ))}
            </Map>
          </MapContainer>
        )}
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
                selected={selectedItems.includes(item.id) ? "selected" : ""}
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
