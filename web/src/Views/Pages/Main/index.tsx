
import React from 'react'
import logo from '../../../assets/logo.svg';
//import './style.css';
import { Container } from './style';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <Container>
      <div className="content">
        <header>
        <img src={logo} alt="Logo EcoLeta"/>
        </header>

        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

          <Link to="/register">
            <span>
              <FiLogIn/>
            </span>
            <strong>
              Cadastre um ponto de coleta
            </strong>
          </Link>
        </main>
      </div>
    </Container>
  )
}

export default Main;
