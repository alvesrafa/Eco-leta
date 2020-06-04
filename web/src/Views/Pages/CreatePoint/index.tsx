import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './style.css';
import logo from '../../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowDownLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LeafletMouseEvent } from 'leaflet'

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
  
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0])
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    uf: '',
    city: ''
  })
  const history = useHistory()
  
  const handleMapClick = (e: LeafletMouseEvent) => {
    setSelectedPosition([
      e.latlng.lat,
      e.latlng.lng
    ])
  }
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
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };
  const handleSelectItem = (id: number) => {
    const alreadySelected = selectedItems.findIndex(item => item === id)

    if(alreadySelected >= 0) {
      let filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }
    
  }
  
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
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setInitialPosition([latitude, longitude])
    })

  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const items = selectedItems
    const [latitude, longitude] = selectedPosition
    const data = {
      ...formData,
      items,
      latitude,
      longitude
    }
    
    await api.post('points', data).then(response => {
      if(response.data.success){
        history.push('/')
        toast.success(response.data.message || 'Ponto de coleta cadastrado com sucesso.')
      } else {
        throw 'Erro ao cadastrar ponto de coleta'
      }
    }).catch(e => {
      toast.error('Erro ao cadastrar ponto de coleta')
    })
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Logo Ecoleta" />

        <Link to="/">
          <FiArrowDownLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" onChange={handleInputChange} />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={handleInputChange} />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                onChange={handleSelectChange}
                value={formData.uf}
              >
                <option value="">Selecione um estado</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" onChange={handleSelectChange} value={formData.city}>
                <option value="">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de Coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>
          <ul className="items-grid">
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item) => (
                <li key={item.id} className={selectedItems.includes(item.id) ? 'selected' : ''} onClick={() => handleSelectItem(item.id)}>
                  <img src={item.image_url} alt="teste" />
                  <span>{item.title}</span>
                </li>
              ))
            ) : (
              <h3>Nenhum item registrado até o momento.</h3>
            )}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
