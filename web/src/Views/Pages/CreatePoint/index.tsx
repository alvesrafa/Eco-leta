import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Container } from './style';
import logo from '../../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiArrowDownLeft } from 'react-icons/fi';
import api from '../../../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormPoint from '../../Components/FormPoint';

interface Item {
  id: number;
  title: string;
  image_url: string;
}
interface UF {
  sigla: string;
}
interface City {
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    uf: '',
    city: '',
  });

  const getUf = async () => {
    axios
      .get<UF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        setUfs(ufInitials);
      })
      .catch((e) => {
        console.log(e);
        toast.error('Erro ao buscar estados');
      });
  };
  const getItems = () => {
    api
      .get('items')
      .then((response) => {
        if (response.data.success) {
          setItems(response.data.items);
        } else {
          throw `Erro ao buscar itens`;
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error('Erro ao buscar itens');
      });
  };
  const getCities = () => {
    if (formData.uf === '0') return;
    axios
      .get<City[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formData.uf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);
        setCities(cityNames);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getItems();
    getUf();
  }, []);

  useEffect(() => {
    getCities();
  }, [formData.uf]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  return (
    <Container>
      <header>
        <img src={logo} alt="Logo Ecoleta" />

        <Link to="/">
          <FiArrowDownLeft />
          Voltar para home
        </Link>
      </header>
      
      <FormPoint
        formData={formData}
        setFormData={setFormData}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        ufs={ufs}
        cities={cities}
        items={items}
        setSelectedPosition={setSelectedPosition}
        selectedPosition={selectedPosition}
        initialPosition={initialPosition}
      />
    </Container>
  );
};

export default CreatePoint;
