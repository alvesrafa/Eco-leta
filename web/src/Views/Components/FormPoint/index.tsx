import React, { ChangeEvent, FormEvent, useState } from 'react';
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ItemsList, Form } from './style';
import MapComponent from '../MapComponent';
import Confirmation from '../Confirmation';


interface FormPoint {
  setSelectedPosition: Function;
  formData: Data;
  setFormData: Function;
  selectedPosition: [number, number];
  initialPosition: [number, number];
  selectedItems: number[];
  setSelectedItems: Function;
  ufs: string[];
  cities: string[];
  items: Item[];
}
interface Data {
  name: string;
  email: string;
  whatsapp: string;
  uf: string;
  city: string;
}
interface Item {
  id: number;
  title: string;
  image_url: string;
}
const FormPoint = (props: FormPoint) => {
  const history = useHistory();
  const [confirmation, setConfirmation] = useState(false);
  const {
    formData,
    setFormData,
    setSelectedPosition,
    selectedPosition,
    initialPosition,
    selectedItems,
    setSelectedItems,
    ufs,
    cities,
    items,
  } = props;

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectItem = (id: number) => {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      let filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const items = selectedItems;
    const [latitude, longitude] = selectedPosition;
    const data = {
      ...formData,
      items,
      latitude,
      longitude,
    };

    await api
      .post('points', data)
      .then((response) => {
        if (response.data.success) {
          toast.success(
            response.data.message || 'Ponto de coleta cadastrado com sucesso.'
          );
          setConfirmation(true);
        } else {
          throw 'Erro ao cadastrar ponto de coleta';
        }
      })
      .catch((e) => {
        toast.error('Erro ao cadastrar ponto de coleta');
      });
  };

  return (
    <>
    {confirmation ? <Confirmation /> : ''}
    
      <Form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <MapComponent
            setPosition={setSelectedPosition}
            position={selectedPosition}
            initialPosition={initialPosition}
          />

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
              <select
                name="city"
                id="city"
                onChange={handleSelectChange}
                value={formData.city}
              >
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
          <ItemsList>
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item) => (
                <li
                  key={item.id}
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                  onClick={() => handleSelectItem(item.id)}
                >
                  <img src={item.image_url} alt="teste" />
                  <span>{item.title}</span>
                </li>
              ))
            ) : (
              <h3>Nenhum item registrado até o momento.</h3>
            )}
          </ItemsList>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </Form>
    </>
  );
};

export default FormPoint;
