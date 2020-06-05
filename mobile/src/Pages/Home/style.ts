import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 32px;
  background: #f0f0f5;
`
export const Main = styled.View`
  flex: 1;
  justify-content: center;
`

export const Title = styled.Text`
  color: #322153;
  font-size: 32px;
  font-family: Ubuntu_700Bold;
  margin-top: 64px;
`
export const Description = styled.Text`
  color: #6c6c80;
  font-size: 16px;
  margin-top: 16px;
  font-family: Roboto_400Regular;
  max-width: 260px;
  line-height: 24px;
`

export const Footer = styled.View`

`
export const Button = styled(RectButton)`
  background: #34cb79;
  height: 60px;
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  margin-top: 8px;
`
export const ButtonText = styled.Text`
  flex:1;
  justify-content: center;
  text-align: center;
  color: #FFF;
  font-family: Roboto_500Medium;
  font-size: 16px;
`
export const ButtonIcon = styled.View`
  height: 60px;
  width: 60px;
  background: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`

// footer: {},

// select: {},

// input: {
//   height: 60,
//   backgroundColor: '#FFF',
//   borderRadius: 10,
//   marginBottom: 8,
//   paddingHorizontal: 24,
//   fontSize: 16,
// },

