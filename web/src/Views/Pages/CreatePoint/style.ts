import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  header {
  margin-top: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
header a {
  color: var(--title-color);
  font-weight: bold;
  text-decoration: none;

  display: flex;
  align-items: center;
}
header a svg {
  margin-right: 16px;
  color: var(--primary-color);
}

`

