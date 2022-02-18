import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
`

export const Title = styled.div`
display:flex;
`

export const Inputs = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 400px;
margin-top: 20px;
`

export const UserInputs = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 400px;
margin-top: 20px;
`

export const Buttons = styled.div`
display:flex;
justify-content: space-around;
margin-top: 20px;
margin-right: 20px;
`

export const Text = styled.p`
  font-size: 12px;
  color: red;
`

export const Links = styled(Link)`
  text-decoration: none
`

export const Imgs = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
`