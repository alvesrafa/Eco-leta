import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from './style';
import { FiCheckCircle } from 'react-icons/fi';

const Confirmation = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => history.push('/'), 2000)
  }, [])

  return (
    <Container>
      <FiCheckCircle size="26" color="#34CB79" />
      <strong>Ponto de coleta cadastrado com sucesso!</strong>
    </Container>
  );
};
export default Confirmation;
