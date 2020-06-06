import React from 'react';
import { Container } from './style'

interface Props {
  children: string;
}

const Error: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>
}
export default Error;