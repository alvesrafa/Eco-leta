import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Select from "react-native-picker-select";

interface City {
  nome: string;
}
interface UF {
  sigla: string;
}
interface SelectForm {
  value: string;
  label: string;
}

const Home = () => {
  const navigation = useNavigation();
  const [uf, setUf] = useState<string>();
  const [city, setCity] = useState<string>();
  const [ufs, setUfs] = useState<SelectForm[]>([]);
  const [cities, setCities] = useState<SelectForm[]>([]);
  const [loading, setLoading] = useState(false);

  function navigateToPoints() {
    navigation.navigate("Points", {
      uf,
      city,
    });
  }
  const getUf = async () => {
    axios
      .get<UF[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        const ufInitials = response.data.map((uf) => {
          return {
            value: uf.sigla,
            label: uf.sigla,
          };
        });
        setUfs(ufInitials);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getCities = () => {
    if (uf === "") return;
    setLoading(true);
    axios
      .get<City[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => {
          return {
            value: city.nome,
            label: city.nome,
          };
        });
        setCities(cityNames);
      })
      .catch((e) => {
        console.log(e);
      });

    setLoading(false);
  };

  useEffect(() => {
    getUf();
  }, []);
  useEffect(() => {
    getCities();
  }, [uf]);
  const pickerStyle = {
    inputIOS: {
      color: "black",
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      backgroundColor: "white",
      borderRadius: 10,
      placeholderColor: "black",
      textAlign: "center",
    },
    inputAndroid: {
      color: "black",
      marginVertical: 5,
      backgroundColor: "white",
      borderRadius: 10,
      placeholderColor: "black",
      textAlign: "center",
    },
    placeholderColor: "black",
    underline: { borderTopWidth: 0 },
    icon: {
      backgroundColor: "#ddd",
      borderTopWidth: 5,
      borderTopColor: "#000000",
      borderRightWidth: 5,
      borderRightColor: "#ddd",
      borderLeftWidth: 5,
      borderLeftColor: "transparent",
      width: 0,
      height: 0,
      top: 20,
      right: 15,
    },
  };
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
        <Select
          //style={pickerStyle}
          placeholder={{
            label: "Selecione um Estado",
            value: "",
          }}
          items={ufs}
          onValueChange={(value) => setUf(value)}
          value={uf}
        />

        {loading ? (
          <Text>Carregando cidades...</Text>
        ) : (
          <Select
            placeholder={{
              label: "Selecione uma cidade",
              value: "",
            }}
            items={cities}
            onValueChange={(value) => setCity(value)}
            value={city}
          />
        )}

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
