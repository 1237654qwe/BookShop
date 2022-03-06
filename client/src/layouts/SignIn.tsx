/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  Container,
  Title,
  Inputs,
  Buttons,
} from '../style/Styled';

import { SignInContainer } from '../style/Styled';
import { AppStateType } from '../redux/store';
import { signIn, changeInput } from '../redux/auth/actions';

const SignIn: React.FC<Props> = ({
  email,
  password,
  login,
  inputChange,
}) => {
  const onClickLogin = () => {
    login(email, password);
  };

  return (
    <SignInContainer>
      <Container>
        <form >
          <Title>
            <Typography variant="h6">Enter in your accaunt</Typography>
          </Title>
          <Inputs>
            <TextField
              name="email"
              type="email"
              label="Email"
              variant="filled"
              value={email}
              onChange={(e: { target: { name: string; value: string; }; }) => {
                inputChange(e.target.name, e.target.value);
              }}
            />
          </Inputs>
          <Inputs>
            <TextField
              name="password"
              type="password"
              label="Password"
              variant="filled"
              value={password}
              onChange={(e: { target: { name: string; value: string; }; }) => {
                inputChange(e.target.name, e.target.value);
              }}
            />
          </Inputs>
          <Buttons>
            <Button
              variant="contained"
              color="primary"
              onClick={onClickLogin}
            >
              Login
            </Button>
            <Button
              color="inherit"
            >
              <Link to="/signUp"> Create an account</Link>
            </Button>
          </Buttons>
        </form>
      </Container>
    </SignInContainer>

  );
};

const mapStateToProps = (state: AppStateType) => {
  const { authReducer: { email, password } } = state;
  return { email, password };
};

const mapDispatchToProps = {
  login: signIn,
  inputChange: changeInput,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
