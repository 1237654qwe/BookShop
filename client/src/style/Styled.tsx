import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 70px;
  overflow: hidden;
  min-height: 78.9vh;
`;

export const Title = styled.div`
display:flex;
`;

export const Inputs = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 400px;
margin-top: 20px;
`;

export const UserInputs = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 400px;
margin-top: 20px;
`;

export const Buttons = styled.div`
display:flex;
justify-content: space-around;
margin-top: 20px;
`;

export const FilterButtons = styled.div`
display:flex;
justify-content: start;
margin-top: 20px;
`;

export const UserButtons = styled.div`
display:flex;
margin-top: 20px;
`;

export const UserInfo = styled.div`
display:flex;
justify-content: start;
flex-direction: column;
`;

export const Text = styled.p`
  font-size: 12px;
  color: red;
`;

export const Links = styled(Link)`
  color: White;
  text-decoration: none;
  margin: 1rem;
  position: relative;
`;

export const SignLinks = styled(Link)`
  color: Blue;
  text-decoration: none;
  margin: 1rem;
  position: relative;
`;

export const Icons = styled.div`
  width: 50px;
  height: 50px;
`;

export const Imgs = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
`;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 50px;
  overflow: hidden;
  min-height: 78.9vh;
`;

export const SignInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const HomeContent = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const HomeFilter = styled.div`
  display: flex;
  flex-direction: column;
  width 25%;
`;

export const HomeBooks = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width 70%;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const CardBox = styled.div`
width: 350px;
margin 10px;
`;

export const Tabs = styled.div`
  margin-left: 5px;
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ModalImg = styled.div`
  display: flex;
  width 40%;
`;

export const ModalTab = styled.div`
  display: flex;
  width 55%;
`;

export const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StarArea = styled.div`
  display: flex;
`;

export const Comments = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChildComments = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;

export const CommentsForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

export const FooterStyle = styled.div`
  margin-top:auto; 
  width: 100%;
`;
